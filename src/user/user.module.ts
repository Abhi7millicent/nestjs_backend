import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import  { User, UserSchema } from './user.schema';
import { UserRepository } from './user.repository';
import { Encryption } from 'src/utils/encryption';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    Encryption,
  ],
})
export class UserModule {}
