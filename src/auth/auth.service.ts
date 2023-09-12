import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private _usersService: UsersService,
    private _jwtService: JwtService,
  ) {}

  getUserData(token: string) {
    console.log(token);
    const { id, name, isAdmin } = this._jwtService.decode(token) as any;
    return { id, name, isAdmin };
  }

  async logInGoogle(email: string) {
    let user = await this._usersService.findOne(email);

    if (!user) {
      user = await this._usersService.create({ login: email });
    }

    const accessToken = this.createToken(user);
    return accessToken;
  }

  async logInGithub(email: string) {
    let user = await this._usersService.findOne(email);

    if (!user) {
      user = await this._usersService.create({ login: email });
    }

    const accessToken = this.createToken(user);
    return accessToken;
  }

  async logIn(login: string, password: string) {
    const user = await this._usersService.findOne(login, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const accessToken = this.createToken(user);
    return accessToken;
  }

  async signUp(login: string, password: string) {
    const res = await this._usersService.create({ login, password });
    return res;
  }

  private createToken(user: User) {
    const accessToken = this._jwtService.sign(
      {
        id: user.id,
        name: user.name,
        isAdmin: user.isAdmin,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: 600,
      },
    );
    return accessToken;
  }
}
