import { Comment } from 'src/comments/entities/comment.entity';
import { CompositionRating } from 'src/ratings/entities/composition-rating.entity';
import { ReviewRating } from 'src/ratings/entities/review-rating.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column({ unique: true })
  login: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 'user' })
  name: string;

  @Column({ name: 'is_blocked', type: 'tinyint', default: 0 })
  isBlocked: boolean;

  @Column({ name: 'is_admin', type: 'tinyint', default: 0 })
  isAdmin: boolean;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => ReviewRating, (rating) => rating.user)
  reviewRatings: ReviewRating[];

  @OneToMany(() => CompositionRating, (rating) => rating.user)
  compositionRatings: CompositionRating[];

  likes?: number;
}
