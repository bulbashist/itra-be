import { GetCommentDto } from 'src/comments/dto/get-comment.dto';
import { Tag } from 'src/tags/entities/tag.entity';

export class GetReviewDto {
  id: number;
  compositionName: string;
  text: string;
  userRating: number;
  avgRating: number;
  title: string;
  author: {
    id: number;
    name: string;
  };
  date: string;
  group: Tag;
  tags: Tag[];
  comments: GetCommentDto[];
  isLiked: boolean;
}
