/// <reference types="mongoose/types/PipelineStage" />
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class User extends Document {
    _id: MongooseSchema.Types.ObjectId;
    name: string;
    middleName: string;
    lastName: string;
    designation: string;
    mail: string;
    password: string;
    role: string;
}
export declare const UserSchema: MongooseSchema<User, import("mongoose").Model<User, any, any, any>, any, any>;
