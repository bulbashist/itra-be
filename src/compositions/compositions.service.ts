import { Injectable } from '@nestjs/common';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Composition } from './entities/composition.entity';
import { Repository } from 'typeorm';
import { GetCompositionDto } from './dto/get-composition.dto';

@Injectable()
export class CompositionsService {
  constructor(
    @InjectRepository(Composition)
    private _repo: Repository<Composition>,
  ) {}

  create(createCompositionDto: CreateCompositionDto) {
    return 'This action adds a new composition';
  }

  async findAll(page: number, amount = 12) {
    const compositions = await this._repo
      .createQueryBuilder('comp')
      .leftJoinAndSelect('comp.tag', 'tag')
      .take(amount)
      .skip((page - 1) * amount)
      .getMany();
    return compositions;
  }

  async findOne(id: number, userId = 0) {
    const composition = await this._repo.findOne({
      where: { id },
      relations: ['tag', 'ratings', 'reviews'],
    });
    return new GetCompositionDto(composition, userId);
  }

  update(id: number, updateCompositionDto: UpdateCompositionDto) {
    return `This action updates a #${id} composition`;
  }

  remove(id: number) {
    return `This action removes a #${id} composition`;
  }
}
