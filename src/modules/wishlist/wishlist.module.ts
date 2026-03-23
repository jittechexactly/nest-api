import { Module } from '@nestjs/common';
import { WishlistService } from './service/wishlist.service';

@Module({
  providers: [WishlistService]
})
export class WishlistModule {}
