import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';

/*
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/auth/google-redirect',
      scope: ['email', 'profile'],
    }
*/

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CLIENT_URL,
      scope: ['user:email'],
    });
  }
  async validate(_: string, __: string, profile: any, done: any): Promise<any> {
    const user = {
      email: profile.emails[0].value,
    };
    done(null, user);
  }
}
