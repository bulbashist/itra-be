import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
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
    if (!token) return;

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

    if (accessToken) {
      res
        .cookie(COOKIE.ACCESS_TOKEN, accessToken, { maxAge: 3600000 })
        .redirect(process.env.CLIENT_APP);
    } else {
      res.redirect(process.env.CLIENT_APP);
    }
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

    if (accessToken) {
      res
        .cookie(COOKIE.ACCESS_TOKEN, accessToken, { maxAge: 3600000 })
        .redirect(process.env.CLIENT_APP);
    } else {
      res.redirect(process.env.CLIENT_APP);
    }
  }

  @Post('signup')
  async signUp(@Body() { login, password }: any, @Res() res: Response) {
    await this.authService.signUp(login, password);

    const accessToken = await this.authService.logIn(login, password);
    if (accessToken) {
      res
        .cookie(COOKIE.ACCESS_TOKEN, accessToken, {
          maxAge: 3600000,
        })
        .end();
    } else {
      res.end();
    }
  }

  @Get('signout')
  signOut(@Res() res: Response) {
    res.clearCookie(COOKIE.ACCESS_TOKEN).end();
  }

  @Post('login')
  async logIn(@Body() { login, password }: any, @Res() res: Response) {
    const accessToken = await this.authService.logIn(login, password);
    if (accessToken) {
      res
        .cookie(COOKIE.ACCESS_TOKEN, accessToken, {
          maxAge: 3600000,
        })
        .end();
    } else {
      res.end();
    }
  }
}
