import { Injectable } from '@nestjs/common';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Composition } from './entities/composition.entity';
import { Repository } from 'typeorm';
import { GetCompositionDto } from './dto/get-composition.dto';
import { CompositionPreviewDto } from './dto/preview.dto';

@Injectable()
export class CompositionsService {
  constructor(
    @InjectRepository(Composition)
    private _repo: Repository<Composition>,
  ) {}

  async findAll(page: number, amount = 12) {
    const compositions = await this._repo
      .createQueryBuilder('comp')
      .leftJoinAndSelect('comp.ratings', 'ratings')
      .leftJoinAndSelect('comp.tag', 'tag')
      .take(amount)
      .skip((page - 1) * amount)
      .getMany();

    const result = compositions.map((comp) => new CompositionPreviewDto(comp));
    return result;
  }

  // TODO
  async findOne(id: number, userId = 0) {
    const composition = await this._repo.findOne({
      where: { id },
      relations: ['tag', 'ratings', 'reviews'],
    });
    return new GetCompositionDto(composition, userId);
  }

  async getHints() {
    const hints = await this._repo
      .createQueryBuilder('comp')
      .select(['comp.id', 'comp.name'])
      .getMany();
    return hints;
  }

  async update(id: number, dto: UpdateCompositionDto) {
    await this._repo.save({ id, ...dto });
  }
}
