import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'reviews_to_users_ratings' })
export class ReviewRating {
  @PrimaryColumn({ name: 'user_id', type: 'int' })
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.reviewRatings)
  user: User;

  @PrimaryColumn({ name: 'review_id', type: 'int' })
  @JoinColumn({ name: 'review_id' })
  @ManyToOne(() => Review, (review) => review.ratings, { onDelete: 'CASCADE' })
  review: Review;

  @Column({ nullable: true })
  score: number;

  @Column({ type: 'tinyint', default: 0 })
  isLiked: boolean;
}
