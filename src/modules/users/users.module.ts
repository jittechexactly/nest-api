import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repository/user.entity';
import { ResponseModule } from '../response/response.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ResponseModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
