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

@Controller('api/ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Patch('/reviews/:id')
  updateRR(
    @Param('id') reviewId: string,
    @Body() { score }: { score: string },
    @Jwt() token: AccessToken,
  ) {
    const userId = token?.id;
    console.log(token, score);
    if (!score || !userId) throw new UnauthorizedException();
    return this.ratingsService.update(userId, +reviewId, +score);
  }

  @Patch('/compositions/:id')
  updateCR(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    // return this.ratingsService.update(+id, updateRatingDto);
  }
}
