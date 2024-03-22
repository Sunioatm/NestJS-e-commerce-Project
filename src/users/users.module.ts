import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { FirestoreModule } from 'src/firestore/firestore.module';
// import { UsersController } from './users.controller';

@Module({
  imports: [FirestoreModule],
  providers: [UsersService],
  // controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
