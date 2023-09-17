import { GetCommentDto } from 'src/comments/dto/get-comment.dto';
import { Tag } from 'src/tags/entities/tag.entity';
import { Review } from '../entities/review.entity';
import { ReviewRating } from 'src/ratings/entities/review-rating.entity';

export class GetReviewDto {
  id: number;
  compositionName: string;
  text: string;
  userRating: number;
  avgRating: number;
  title: string;
  author: {
    id: number;
    name: string;
  };
  date: string;
  group: Tag;
  tags: Tag[];
  comments: GetCommentDto[];
  isLiked: boolean;

  constructor(review: Review, userId) {
    this.id = review.id;
    this.compositionName = review.composition.name;
    this.text = review.text;
    this.title = review.title;
    this.author = {
      id: review.user.id,
      name: review.user.name,
    };
    this.date = review.date.toISOString();
    this.avgRating = this.getAvgRating(review.ratings);
    this.userRating =
      review.ratings.find((rating) => rating.user === userId)?.score ?? 0;
    this.isLiked =
      review.ratings.find((rating) => rating.user === userId)?.isLiked ?? false;
    this.group = review.composition.tag;
    this.tags = review.tags;
    this.comments = review.comments.map((comment) => ({
      id: comment.id,
      author: {
        id: comment.user.id,
        name: comment.user.name,
      },
      date: comment.date,
      text: comment.text,
    }));
  }

  private getAvgRating(ratings: ReviewRating[]) {
    if (ratings.length === 0) return 0;

    const temp = ratings.filter((rating) => rating.score !== null);
    return temp.reduce((sum, rating) => sum + rating.score, 0) / temp.length;
  }
}
