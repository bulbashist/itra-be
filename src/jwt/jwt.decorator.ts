import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AccessToken } from 'src/utility/types';

export const Jwt = createParamDecorator<AccessToken>(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
    const token = req.cookies.accessToken;

    try {
      const decryptedToken = jwtService.decode(token) as AccessToken;
      return decryptedToken;
    } catch {}
  },
);
