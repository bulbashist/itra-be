import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRating } from './entities/review-rating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(ReviewRating)
    private _rrRepo: Repository<ReviewRating>,
  ) {}

  async update(userId: number, reviewId: number, score: number) {
    const res = await this._rrRepo.save({
      user: {
        id: userId,
      },
      review: {
        id: reviewId,
      },
      score,
    });
    console.log(res);
    return res;
  }
}
