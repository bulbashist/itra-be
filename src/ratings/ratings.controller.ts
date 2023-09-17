import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  ParseIntPipe,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { Jwt } from 'src/jwt/jwt.decorator';
import { AccessToken } from 'src/utility/types';
import { ReviewRatingDTO } from './dto/review-rating.dto';
import { CompositionRatingDTO } from './dto/composition-rating.dto';

@Controller('api/ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Patch('/reviews/:id')
  updateRR(
    @Param('id') reviewId: string,
    @Body() body: ReviewRatingDTO,
    @Jwt() token: AccessToken,
  ) {
    const userId = token?.id;
    if ((!body.score && body.isLiked == undefined) || !userId)
      throw new UnauthorizedException();
    return this.ratingsService.updateRR(userId, +reviewId, body);
  }

  @Patch('/compositions/:id')
  updateCR(
    @Param('id', ParseIntPipe) compositionId: number,
    @Body() body: CompositionRatingDTO,
    @Jwt() token: AccessToken,
  ) {
    const userId = token?.id;
    if (!body.score || !userId) throw new UnauthorizedException();
    return this.ratingsService.updateCR(userId, compositionId, body);
  }
}
