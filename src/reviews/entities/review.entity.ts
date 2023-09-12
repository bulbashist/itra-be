import { Comment } from 'src/comments/entities/comment.entity';
import { Composition } from 'src/compositions/entities/composition.entity';
import { ReviewRating } from 'src/ratings/entities/review-rating.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column({ type: 'text' })
  @Index({ fulltext: true })
  text: string;

  @Column({ type: 'varchar', length: 45 })
  @Index({ fulltext: true })
  title: string;

  @UpdateDateColumn()
  date: Date;

  @Column({ length: 100 })
  previewImg: string;

  avgRating?: number;

  @OneToMany(() => Comment, (comment) => comment.review)
  comments: Comment[];

  @OneToMany(() => ReviewRating, (rating) => rating.review)
  ratings: ReviewRating[];

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Composition, (composition) => composition.reviews)
  @JoinColumn({ name: 'composition_id' })
  composition: Composition;

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable({
    name: 'reviews_has_tags',
    joinColumn: { name: 'review_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags: Tag[];
}
