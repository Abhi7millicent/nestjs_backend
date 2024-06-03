/// <reference types="mongoose/types/PipelineStage" />
import { Model } from 'mongoose';
import { User } from '../user/user.schema';
import { GenericRepository } from '../repositories/generic.repository';
export declare class AuthenticationRepository extends GenericRepository<User> {
    constructor(userModel: Model<User>);
}
