import { Tag } from 'src/tags/entities/tag.entity';

export class CreateReviewDto {
  user?: {
    id: number;
  };

  composition: {
    id: number;
  };
  previewImg: string;
  title: string;
  text: string;
  tags: Tag[];
}

export type CreateRepoReviewDto = CreateReviewDto & { user: { id: number } };
