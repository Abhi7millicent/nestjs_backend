import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import  {User}  from '../user/schema/user.schema';
import { GenericRepository } from './generic.repository';

@Injectable()
export class AuthenticationRepository extends GenericRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }

  async findByMail(mail: string): Promise<User> {
    return this.model.findOne({ mail }).exec();
  }
}
