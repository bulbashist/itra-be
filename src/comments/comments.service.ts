import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private _repo: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const saveRes = await this._repo.save(createCommentDto);
    const result = await this._repo.findOne({
      where: { id: saveRes.id },
      relations: ['user'],
    });
    return result;
  }

  async remove(id: number) {
    const result = await this._repo.delete(id);
    console.log(result, id);
    return result;
  }
}
