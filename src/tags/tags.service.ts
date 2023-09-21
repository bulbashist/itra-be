import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private _repo: Repository<Tag>,
  ) {
    setInterval(() => {
      _repo
        .query('SELECT 1')
        .then(console.log)
        .catch(() => console.log('disconnected'));
    }, 1000 * 60 * 60 * 0.5);
  }

  async create(name: string) {
    const result = await this._repo.insert({ name });
    return result;
  }

  async findAll() {
    const tags = await this._repo.find();
    return tags;
  }

  async findOne(id: number) {
    const result = await this._repo.findOne({ where: { id } });
    return result;
  }

  update(id: number, name: string) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
