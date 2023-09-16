import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column({ type: 'varchar', length: 1000 })
  @Index({ fulltext: true })
  text: string;

  @UpdateDateColumn()
  date: Date;

  @ManyToOne(() => Review, (review) => review.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'review_id' })
  review: Review;

  @ManyToOne(() => User, (user) => user.comments, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
