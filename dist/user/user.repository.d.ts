/// <reference types="mongoose/types/PipelineStage" />
import { Model } from 'mongoose';
import { User } from './user.schema';
import { GenericRepository } from '../repositories/generic.repository';
export declare class UserRepository extends GenericRepository<User> {
    constructor(userModel: Model<User>);
}
