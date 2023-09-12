import { Composition } from 'src/compositions/entities/composition.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Composition, (composition) => composition.tag)
  compositions: Composition[];
}
