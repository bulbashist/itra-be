import { Tag } from 'src/tags/entities/tag.entity';
import { Composition } from '../entities/composition.entity';
import { CompositionRating } from 'src/ratings/entities/composition-rating.entity';
import { Review } from 'src/reviews/entities/review.entity';

export class GetCompositionDto {
  public id: number;
  public name: string;
  public author: string;
  public description: string;
  public tag: Tag;
  public avgRating: number;
  public userRating: number;
  public reviews: Pick<Review, 'id' | 'title'>[];

  constructor(composition: Composition, userId: number) {
    this.id = composition.id;
    this.name = composition.name;
    this.author = composition.author;
    this.description = composition.description;
    this.tag = composition.tag;
    this.avgRating = this.getAvgRating(composition.ratings);
    this.userRating = this.getUserRating(composition.ratings, userId);
    this.reviews = composition.reviews;
  }

  private getAvgRating(ratings: CompositionRating[]) {
    return (
      ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length
    );
  }

  private getUserRating(ratings: CompositionRating[], userId) {
    return ratings.find((rating) => rating.user === userId)?.score ?? 0;
  }
}
