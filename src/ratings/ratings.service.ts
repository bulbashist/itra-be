import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRating } from './entities/review-rating.entity';
import { Repository } from 'typeorm';
import { ReviewRatingDTO } from './dto/review-rating.dto';
import { CompositionRating } from './entities/composition-rating.entity';
import { CompositionRatingDTO } from './dto/composition-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(ReviewRating)
    private _rrRepo: Repository<ReviewRating>,
    @InjectRepository(CompositionRating)
    private _crRepo: Repository<CompositionRating>,
  ) {}

  async updateRR(userId: number, reviewId: number, dto: ReviewRatingDTO) {
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

  async updateCR(
    userId: number,
    compositionId: number,
    dto: CompositionRatingDTO,
  ) {
    const res = await this._crRepo.save({
      user: {
        id: userId,
      },
      composition: {
        id: compositionId,
      },
      ...dto,
    });
    return res;
  }
}
