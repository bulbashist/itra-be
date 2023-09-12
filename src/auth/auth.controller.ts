import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Redirect,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { GoogleOAuthGuard } from './google/google.guard';
import { GithubOAuthGuard } from './github/github.guard';
import * as COOKIE from 'src/constants/cookies';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user')
  getUserData(@Req() req: Request) {
    const token = req.cookies.accessToken;
    const data = this.authService.getUserData(token);
    return data;
  }

  @Get('login-google')
  @UseGuards(GoogleOAuthGuard)
  async loginGoogle() {
    return;
  }

  @Get('login-google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async loginGoogleCallback(@Res() res: Response, @Req() req: Request) {
    const { email } = req.user as any;

    const accessToken = await this.authService.logInGoogle(email);

    res
      .cookie(COOKIE.ACCESS_TOKEN, accessToken)
      .redirect(process.env.CLIENT_APP);
  }

  @Get('login-github')
  @UseGuards(GithubOAuthGuard)
  async loginGithub() {
    return;
  }

  @Get('login-github-redirect')
  @UseGuards(GithubOAuthGuard)
  async loginGithubCallback(@Res() res: Response, @Req() req: Request) {
    const { email } = req.user as any;

    const accessToken = await this.authService.logInGithub(email);

    res
      .cookie(COOKIE.ACCESS_TOKEN, accessToken)
      .redirect(process.env.CLIENT_APP);
  }

  @Post('signup')
  async signUp(@Body() { login, password }: any) {
    const result = await this.authService.signUp(login, password);

    if (!result) throw new BadRequestException('Same login');
    return result;
  }

  @Post('login')
  async logIn(@Body() { login, password }: any) {
    const result = await this.authService.logIn(login, password);
    return result;
  }
}
