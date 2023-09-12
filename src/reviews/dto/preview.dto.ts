import { Tag } from 'src/tags/entities/tag.entity';
import { Review } from '../entities/review.entity';
import { ReviewRating } from 'src/ratings/entities/review-rating.entity';

export class Preview {
  id: number;
  title: string;
  date: Date;
  compositionName: string;
  avgRating: number;
  tags: Tag[];

  constructor(review: Review) {
    this.id = review.id;
    this.title = review.title;
    this.date = review.date;
    this.compositionName = review.composition.name;
    this.avgRating = this.getAvgRating(review.ratings);
    this.tags = review.tags;
  }

  private getAvgRating(ratings: ReviewRating[]) {
    return (
      ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length
    );
  }
}