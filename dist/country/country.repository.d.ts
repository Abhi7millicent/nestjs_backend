/// <reference types="mongoose/types/PipelineStage" />
import { Model } from 'mongoose';
import { GenericRepository } from "src/repositories/generic.repository";
import { Country } from "./country.schema";
export declare class CountryRepository extends GenericRepository<Country> {
    constructor(userModel: Model<Country>);
}
