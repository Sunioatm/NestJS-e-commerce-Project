import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [FirestoreModule, PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
