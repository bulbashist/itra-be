import { Tag } from 'src/tags/entities/tag.entity';
import { Composition } from '../entities/composition.entity';
import { CompositionRating } from 'src/ratings/entities/composition-rating.entity';

export class GetCompositionDto {
  public id: number;
  public author: string;
  public description: string;
  public tag: Tag;
  public avgRating;
  public userRating;

  constructor(composition: Composition, userId: number) {
    this.id = composition.id;
    this.author = composition.author;
    this.description = composition.description;
    this.tag = composition.tag;
    this.avgRating = this.getAvgRating(composition.ratings);
    this.userRating = this.getUserRating(composition.ratings, userId);
  }

  private getAvgRating(ratings: CompositionRating[]) {
    return (
      ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length
    );
  }

  private getUserRating(ratings: CompositionRating[], userId: number) {
    return ratings.find((rating) => rating.user.id === userId)?.score ?? 0;
  }
}
