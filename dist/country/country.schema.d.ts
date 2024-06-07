/// <reference types="mongoose/types/PipelineStage" />
import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Country extends Document {
    _id: MongooseSchema.Types.ObjectId;
    name: string;
    code: string;
}
export declare const CountrySchema: MongooseSchema<Country, import("mongoose").Model<Country, any, any, any>, any, any>;
