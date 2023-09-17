import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Jwt } from 'src/jwt/jwt.decorator';
import { PatchGuard } from './guards/patch.guard';
import { DeleteGuard } from './guards/delete.guard';
import { AccessToken } from 'src/utility/types';
import { PostGuard } from './guards/post.guard';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('search')
  async findByText(@Query('text') text: string) {
    return await this.reviewsService.findByText(text);
  }

  @Get('popular')
  async findPopular(@Query() query: any) {
    const { page, tag } = query;
    return await this.reviewsService.findPopular(10, +page, +tag);
  }

  @Get('new')
  async findLatest(@Query() query: any) {
    const { page, tag } = query;
    return await this.reviewsService.findLatest(10, +page, +tag);
  }

  @Get('previews')
  async findPreviews(@Query('page', ParseIntPipe) page: number) {
    return await this.reviewsService.findPreviews(page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Jwt() token: AccessToken) {
    return await this.reviewsService.findOne(+id, token?.id);
  }

  @Post()
  @UseGuards(PostGuard)
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Jwt() token: AccessToken,
  ) {
    const { user } = createReviewDto;
    const userId = token.isAdmin && user ? user.id : token.id;

    return await this.reviewsService.create(createReviewDto, userId);
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
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.reviewsService.remove(id);
  }
}
