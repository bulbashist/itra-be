import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AccessToken } from 'src/utility/types';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatchGuard implements CanActivate {
  constructor(
    @InjectRepository(Review)
    private _repo: Repository<Review>,
    private _jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<Request<{ id: string }, never, UpdateReviewDto>>();

    const reviewId = +req.params.id;
    const token = req.cookies.accessToken;

    const userId = await this._repo
      .createQueryBuilder('review')
      .where('review.id = :id', { id: reviewId })
      .select('user_id', 'id')
      .getRawOne()
      .then((data) => data.id);

    try {
      const data = this._jwtService.decode(token) as AccessToken;
      if (data.id === userId || data.isAdmin) return true;
    } catch {
      return false;
    }
  }
}
