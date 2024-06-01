import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import  {User}  from './user.schema';
import { GenericRepository } from '../repositories/generic.repository';

@Injectable()
export class UserRepository extends GenericRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }

}
