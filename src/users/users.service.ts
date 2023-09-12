import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/reviews/entities/review.entity';
import { title } from 'process';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private _repo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
    };
    const result = await this._repo.save(user);
    return result;
  }

  async findAll() {
    const users = await this._repo.find();
    return users;
  }

  async findOneByID(id: number) {
    const user = await this._repo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoin('user.reviews', 'reviews')
      .addSelect(['reviews.id', 'reviews.title', 'reviews.date'])
      .leftJoinAndSelect('reviews.ratings', 'ratings')
      .leftJoin('reviews.composition', 'composition')
      .addSelect(['composition.id', 'composition.name'])
      .getOne();

    user.reviews = user.reviews.map((review) => {
      review.avgRating =
        review.ratings.reduce((sum, rating) => sum + rating.score, 0) /
        review.ratings.length;
      return review;
    });

    return user;
  }

  async findOne(login: string, password?: string) {
    const user = await this._repo.findOne({
      where: {
        login,
        password,
      },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this._repo.save({
      id,
      ...updateUserDto,
    });
    return result;
  }

  async remove(id: number) {
    // CHECK CASCADES
    const user = await this.findOneByID(id);
    const result = await this._repo.remove(user);
    return result;
  }
}
