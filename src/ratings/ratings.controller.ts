import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Jwt } from 'src/jwt/jwt.decorator';
import { AccessToken } from 'src/utility/types';
import { ReviewRatingDTO } from './dto/review-rating.dto';

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
    return this.ratingsService.update(userId, +reviewId, body);
  }

  @Patch('/compositions/:id')
  updateCR(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    // return this.ratingsService.update(+id, updateRatingDto);
  }
}
