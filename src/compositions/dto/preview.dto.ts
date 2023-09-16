import { Tag } from 'src/tags/entities/tag.entity';
import { Composition } from '../entities/composition.entity';
import { CompositionRating } from 'src/ratings/entities/composition-rating.entity';

export class CompositionPreviewDto {
  id: number;
  name: string;
  author: string;
  avgRating: number;
  tag: Tag;

  constructor(composition: Composition) {
    this.id = composition.id;
    this.name = composition.name;
    this.avgRating = this.getAvgRating(composition.ratings);
    this.tag = composition.tag;
    this.author = composition.author;
  }

  private getAvgRating(ratings: CompositionRating[]) {
    if (ratings.length === 0) return 0;

    return (
      ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length
    );
  }
}
