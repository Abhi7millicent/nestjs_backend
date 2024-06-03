/// <reference types="mongoose/types/PipelineStage" />
import { City } from './city.schema';
import { CityService } from './city.service';
import { PopulatedDoc } from 'mongoose';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    createCity(createCityDto: Partial<City>): Promise<City>;
    getAllCities(): Promise<City[]>;
    getStatesByCountryId(stateId: string): Promise<PopulatedDoc<City>[]>;
    getstateByCity(name: string): Promise<PopulatedDoc<City | null>>;
    getCityById(id: string): Promise<City | null>;
    updateCity(id: string, updateCityDto: Partial<City>): Promise<City | null>;
    deleteCity(id: string): Promise<City | null>;
}
