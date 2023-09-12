import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google/google.strategy';
import { GithubStrategy } from './github/github.strategy';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 600,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy],
  exports: [AuthService, UsersModule, JwtModule],
})
export class AuthModule {}
