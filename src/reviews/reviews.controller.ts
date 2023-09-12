import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Request } from 'express';
import { Jwt } from 'src/jwt/jwt.decorator';
import { PatchGuard } from './guards/patch.guard';
import { DeleteGuard } from './guards/delete.guard';
import { AccessToken } from 'src/utility/types';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Jwt() token: AccessToken) {
    console.log(token);
    return this.reviewsService.create(createReviewDto, token?.id);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('search')
  async findByText() {
    return await this.reviewsService.findByText();
  }

  @Get('popular')
  async findPopular() {
    return await this.reviewsService.findPopular(10);
  }

  @Get('new')
  async findNew() {
    return await this.reviewsService.findPopular(10);
  }

  @Get('previews')
  async findPreviews() {
    return await this.reviewsService.findPreviews();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Jwt() token: AccessToken) {
    return await this.reviewsService.findOne(+id, token?.id);
  }

  @Patch(':id')
  @UseGuards(PatchGuard)
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(DeleteGuard)
  async remove(@Param('id') id: string) {
    return await this.reviewsService.remove(+id);
  }
}
