import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsGateway } from './comments.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), JwtModule],
  providers: [CommentsGateway, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
