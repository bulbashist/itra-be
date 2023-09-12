import { CompositionRating } from 'src/ratings/entities/composition-rating.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'compositions' })
export class Composition {
  @PrimaryColumn()
  id: number;

  @Column()
  @Index({ fulltext: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  author: string;

  @OneToMany(() => Review, (review) => review.composition)
  reviews: Review[];

  @OneToMany(() => CompositionRating, (rating) => rating.composition)
  ratings: CompositionRating[];

  @ManyToOne(() => Tag, (tag) => tag.compositions)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
