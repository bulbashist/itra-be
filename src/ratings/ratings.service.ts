import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRating } from './entities/review-rating.entity';
import { Repository } from 'typeorm';
import { ReviewRatingDTO } from './dto/review-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(ReviewRating)
    private _rrRepo: Repository<ReviewRating>,
  ) {}

  async update(userId: number, reviewId: number, dto: ReviewRatingDTO) {
    const res = await this._rrRepo.save({
      user: {
        id: userId,
      },
      review: {
        id: reviewId,
      },
      ...dto,
    });
    return res;
  }
}
