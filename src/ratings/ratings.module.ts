import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { ReviewRating } from './entities/review-rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompositionRating } from './entities/composition-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRating, CompositionRating])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
