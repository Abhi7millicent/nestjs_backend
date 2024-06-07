/// <reference types="mongoose/types/PipelineStage" />
import { GenericRepository } from "src/repositories/generic.repository";
import { Model } from 'mongoose';
import { City } from "./city.schema";
export declare class CityRepository extends GenericRepository<City> {
    constructor(cityModel: Model<City>);
}
