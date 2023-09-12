import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column()
  @Index({ fulltext: true })
  text: string;

  @UpdateDateColumn()
  date: Date;

  @ManyToOne(() => Review, (review) => review.comments, { nullable: false })
  @JoinColumn({ name: 'review_id' })
  review: Review;

  @ManyToOne(() => User, (user) => user.comments, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
