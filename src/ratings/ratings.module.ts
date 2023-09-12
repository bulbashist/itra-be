import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { ReviewRating } from './entities/review-rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRating])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
