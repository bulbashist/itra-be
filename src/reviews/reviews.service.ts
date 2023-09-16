import { Injectable } from '@nestjs/common';
import { CreateRepoReviewDto, CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { GetReviewDto } from './dto/get-review.dto';
import { ReviewRating } from 'src/ratings/entities/review-rating.entity';
import { Preview } from './dto/preview.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private _repo: Repository<Review>,
  ) {}

  public previewQuery = this._repo
    .createQueryBuilder('review')
    .select(['review.id', 'review.title', 'review.date', 'review.previewImg'])
    .leftJoin('review.composition', 'composition')
    .addSelect('composition.name')
    .leftJoinAndSelect('review.ratings', 'ratings')
    .leftJoinAndSelect('review.tags', 'tags');

  async create(createReviewDto: CreateReviewDto, userId: number) {
    const review = {
      ...createReviewDto,
      user: { id: userId },
    };
    const result = await this._repo.save<CreateRepoReviewDto>(review);
    return result;
  }

  async findByText(text = '') {
    const reviews = await this._repo
      .createQueryBuilder('review')
      .select(['review.id', 'review.title', 'review.date'])
      .leftJoin('review.composition', 'composition')
      .addSelect('composition.name')
      .leftJoin('review.comments', 'comments')
      .leftJoinAndSelect('review.ratings', 'ratings')
      .leftJoinAndSelect('review.tags', 'tags')
      .where('MATCH(review.text) AGAINST (:text IN BOOLEAN MODE)')
      .orWhere('MATCH(review.title) AGAINST (:text IN BOOLEAN MODE)')
      .orWhere('MATCH(composition.name) AGAINST (:text IN BOOLEAN MODE)')
      .orWhere('MATCH(comments.text) AGAINST (:text IN BOOLEAN MODE)')
      .setParameter('text', text)
      .getMany();

    const result = reviews.map((review) => {
      return new Preview(review);
    });

    return result;
  }

  findAll() {
    return this._repo.find({
      take: 12,
    });
  }

  async findPreviews(page = 1, amount = 12) {
    const reviews = await this._repo
      .createQueryBuilder('review')
      .select(['review.id', 'review.title', 'review.date', 'review.previewImg'])
      .leftJoin('review.composition', 'composition')
      .addSelect('composition.name')
      .leftJoinAndSelect('composition.tag', 'tag')
      .leftJoinAndSelect('review.ratings', 'ratings')
      .leftJoinAndSelect('review.tags', 'tags')
      .take(amount)
      .skip((page - 1) * amount)
      .getMany();

    const result = reviews.map((review) => {
      return new Preview(review);
    });

    return result;
  }

  /*
  id
  title
  avgRating
  composition
  tags
  date
  */

  async findOne(id: number, userId = 0) {
    const review = await this._repo
      .createQueryBuilder('review')
      .where('review.id = :id', { id })
      .leftJoin('review.composition', 'composition')
      .addSelect('composition.name')
      .leftJoinAndSelect('review.ratings', 'ratings')
      .leftJoinAndSelect('review.comments', 'comments')
      .leftJoinAndSelect('review.tags', 'tags')
      .leftJoin('comments.user', 'user')
      .addSelect(['user.id', 'user.name'])
      .leftJoin('review.user', 'author')
      .addSelect(['author.id', 'author.name'])
      .getOne();

    const result = this.getTransform(review, userId);
    return result;
  }

  async findPopular(amount: number, page?: number, tagId?: number) {
    const reviews = await this._repo
      .createQueryBuilder('review')
      .select(['review.id', 'review.title', 'review.date', 'review.previewImg'])
      .leftJoin('review.composition', 'composition')
      .addSelect('composition.name')
      .leftJoinAndSelect('composition.tag', 'tag')
      .leftJoinAndSelect('review.ratings', 'ratings')
      .leftJoin('review.tags', 'tags')
      .where(tagId ? 'tags.id = :tagId' : '', { tagId })
      .orWhere(tagId ? 'tag.id = :tagId' : '', { tagId })
      .leftJoinAndSelect('review.tags', 'tags2')
      .addSelect('AVG(ratings.score) OVER(PARTITION BY review.id)', 'avgRating')
      .orderBy('avgRating', 'DESC')
      .take(amount)
      .skip(page ? (page - 1) * amount : 0)
      .getMany();

    const result = reviews.map((review) => {
      return new Preview(review);
    });

    return result;
  }

  async findLatest(amount: number, page = 1, tagId?: number) {
    const reviews = await this._repo
      .createQueryBuilder('review')
      .select(['review.id', 'review.title', 'review.date', 'review.previewImg'])
      .leftJoin('review.composition', 'composition')
      .addSelect('composition.name')
      .leftJoinAndSelect('composition.tag', 'tag')
      .leftJoinAndSelect('review.ratings', 'ratings')
      .leftJoin('review.tags', 'tags')
      .where(tagId ? 'tags.id = :tagId' : '', { tagId })
      .orWhere(tagId ? 'tag.id = :tagId' : '', { tagId })
      .leftJoinAndSelect('review.tags', 'tags2')
      .orderBy('review.date', 'DESC')
      .take(amount)
      .skip(page ? (page - 1) * amount : 0)
      .getMany();

    const result = reviews.map((review) => {
      return new Preview(review);
    });

    return result;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this._repo.findOne({
      where: {
        id,
      },
      relations: ['tags'],
    });

    const updatedReview = {
      ...review,
      ...updateReviewDto,
    };

    const result = await this._repo.save(updatedReview);
    return result;
  }

  async remove(id: number) {
    const review = await this._repo.findOne({ where: { id } });
    const result = await this._repo.remove(review);
    return result;
  }

  private getTransform(review: Review, userId): GetReviewDto {
    return {
      id: review.id,
      compositionName: review.composition.name,
      text: review.text,
      title: review.title,
      author: {
        id: review.user.id,
        name: review.user.name,
      },
      date: review.date.toISOString(),
      avgRating: this.getAvgRating(review.ratings),
      userRating:
        review.ratings.find((rating) => rating.user === userId)?.score ?? 0,
      isLiked:
        review.ratings.find((rating) => rating.user === userId)?.isLiked ??
        false,
      group: review.composition.tag,
      tags: review.tags,
      comments: review.comments.map((comment) => ({
        id: comment.id,
        author: {
          id: comment.user.id,
          name: comment.user.name,
        },
        date: comment.date,
        text: comment.text,
      })),
    };
  }

  private getAvgRating(ratings: ReviewRating[]) {
    return (
      ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length
    );
  }
}
