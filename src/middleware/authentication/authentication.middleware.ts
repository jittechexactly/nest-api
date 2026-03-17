import { HttpException, HttpStatus, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { ResponseService } from 'src/modules/response/service/response.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService, private readonly responService: ResponseService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException(
        this.responService.response(false, "Something went wrong!", {}),
        HttpStatus.FORBIDDEN
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new HttpException(
        this.responService.response(false, "Login expired!", {}),
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}