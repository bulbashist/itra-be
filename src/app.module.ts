import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/entities/review.entity';
import { User } from './users/entities/user.entity';
import { TagsModule } from './tags/tags.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { Tag } from './tags/entities/tag.entity';
import { AuthModule } from './auth/auth.module';
import { CompositionsModule } from './compositions/compositions.module';
import { Composition } from './compositions/entities/composition.entity';
import { CompositionRating } from './ratings/entities/composition-rating.entity';
import { ReviewRating } from './ratings/entities/review-rating.entity';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DBHOST,
      port: +process.env.DBPORT,
      username: process.env.DBUSER,
      password: process.env.DBPASS,
      database: process.env.DBNAME,
      poolSize: 10,
      keepConnectionAlive: true,
      entities: [
        User,
        Review,
        Comment,
        Tag,
        Composition,
        CompositionRating,
        ReviewRating,
      ],
      synchronize: true,
    }),
    ReviewsModule,
    TagsModule,
    CommentsModule,
    AuthModule,
    CompositionsModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
