import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, getConnection } from 'typeorm';

@Injectable()
export class ReviewRepoQueries {
  public previewQuery = createQueryBuilder;
}
