import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(private _jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.cookies.accessToken;

    try {
      this._jwtService.verify(token, { secret: process.env.JWT_SECRET });
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
