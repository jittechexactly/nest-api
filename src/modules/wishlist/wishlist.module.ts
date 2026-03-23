import { Module } from '@nestjs/common';
import { WishlistService } from './service/wishlist.service';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [WishlistService],
  imports: [UsersModule]
})
export class WishlistModule {}
