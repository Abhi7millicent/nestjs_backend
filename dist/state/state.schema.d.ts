/// <reference types="mongoose/types/PipelineStage" />
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class State extends Document {
    _id: MongooseSchema.Types.ObjectId;
    name: string;
    code: string;
    country: MongooseSchema.Types.ObjectId;
}
export declare const StateSchema: MongooseSchema<State, import("mongoose").Model<State, any, any, any>, any, any>;
