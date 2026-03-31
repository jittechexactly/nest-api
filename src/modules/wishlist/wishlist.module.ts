import { Module } from '@nestjs/common';
import { WishlistService } from './service/wishlist.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './repository/wishlist.entity';
import { ResponseModule } from '../response/response.module';

@Module({
  providers: [WishlistService],
  imports: [UsersModule, TypeOrmModule.forFeature([Wishlist]), ResponseModule]
})
export class WishlistModule {}
