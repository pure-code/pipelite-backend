import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserModel } from '../users/user.model';
import { RegisterController } from './register.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  providers: [RegisterService],
  exports: [RegisterService],
  controllers: [RegisterController],
})
export class RegisterModule {}
