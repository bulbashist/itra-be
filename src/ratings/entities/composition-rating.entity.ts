import { Composition } from 'src/compositions/entities/composition.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'compositions_to_users_ratings' })
export class CompositionRating {
  @PrimaryColumn({ name: 'user_id', type: 'int' })
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.compositionRatings, {
    onDelete: 'CASCADE',
  })
  user: User;

  @PrimaryColumn({ type: 'int', name: 'composition_id' })
  @JoinColumn({ name: 'composition_id' })
  @ManyToOne(() => Composition, (composition) => composition.ratings, {})
  composition: Composition;

  @Column()
  score: number;
}
