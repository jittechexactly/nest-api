import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JsonOnlyValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const contentType = req.headers['content-type'];
    const isValidPermission = req.headers['x-api-key'];

    if (!isValidPermission || isValidPermission !== process.env.API_KEY) {
      return res.status(403).json({ message: 'Not Authorized' });
    }

    if (!contentType?.includes('application/json')) {
      if (!req.is('json')) {
        return res.status(400).json({ message: 'Content-Type must be application/json' });
      }
    }

    next();
  }
}
