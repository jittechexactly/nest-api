import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app/controller/app.controller';
import { AppService } from './app/service/app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonOnlyValidationMiddleware } from './middleware/json-only-validation/json-only-validation.middleware';
import { ProductsModule } from './modules/web/products/products.module';
import { WebAuthModule } from './modules/web/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductModule } from './modules/product/product.module';
import { ResponseModule } from './modules/response/response.module';
import { AuthenticationMiddleware } from './middleware/authentication/authentication.middleware';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategys/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ProductsModule,
    WebAuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ProductModule,
    ResponseModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JsonOnlyValidationMiddleware).forRoutes('api/*');
    consumer.apply(AuthenticationMiddleware)
      .exclude(
        { path: 'api/v1/auth/register', method: RequestMethod.POST },
        { path: 'api/v1/auth/login', method: RequestMethod.POST },
        { path: 'api/v1/auth/email-verification', method: RequestMethod.POST },
        { path: 'api/v1/auth/auth-token', method: RequestMethod.POST }
      )
      .forRoutes('api/*');
  }
}
