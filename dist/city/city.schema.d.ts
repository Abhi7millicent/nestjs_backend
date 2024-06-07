/// <reference types="mongoose/types/PipelineStage" />
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class City extends Document {
    _id: MongooseSchema.Types.ObjectId;
    name: string;
    state: MongooseSchema.Types.ObjectId;
}
export declare const CitySchema: MongooseSchema<City, import("mongoose").Model<City, any, any, any>, any, any>;
