/// <reference types="mongoose/types/PipelineStage" />
import { City } from './city.schema';
import { CityRepository } from './citry.repository';
import { PopulatedDoc } from 'mongoose';
export declare class CityService {
    private readonly cityRepository;
    constructor(cityRepository: CityRepository);
    createCity(city: Partial<City>): Promise<City>;
    getAllCities(): Promise<City[]>;
    getstateByCity(name: string): Promise<PopulatedDoc<City>>;
    getCityById(id: string): Promise<City | null>;
    updateCity(id: string, city: Partial<City>): Promise<City | null>;
    deleteCity(id: string): Promise<City | null>;
    getCitiesWithLimit(stateId: string): Promise<City[]>;
    getCitiesWithSkip(stateId: string): Promise<City[]>;
    getCitiesWithSelect(stateId: string): Promise<City[]>;
    getCitiesWithPopulate(stateId: string): Promise<City[]>;
    getCitiesAscendingByName(stateId: string): Promise<City[]>;
    getCitiesDescendingByName(stateId: string): Promise<City[]>;
    getCitiesByStateId(stateId: string): Promise<PopulatedDoc<City>[]>;
}
