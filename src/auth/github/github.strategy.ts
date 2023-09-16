import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';

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
