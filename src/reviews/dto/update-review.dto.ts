import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { Tag } from 'src/tags/entities/tag.entity';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  title: string;
  text: string;
  tags: Tag[];
}
