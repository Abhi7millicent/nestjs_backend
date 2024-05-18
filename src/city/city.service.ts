import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { City } from './city.schema';
import { CityRepository } from './citry.repository';
import { promises } from 'dns';

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  async createCity(city: Partial<City>): Promise<City> {
    return this.cityRepository.create(city);
  }

  async getAllCities(): Promise<City[]> {
    return this.cityRepository.findAll();
  }

//   async getCitiesByStateId(stateId: string): Promise<City[]> {
//     try {
//         const cities = await this.cityRepository.findAll({ state: stateId }, { sort: { name: 1 }, limit: 1, populate: 'state' });
//         console.log("Sorted Cities:", cities); // Log cities to inspect
//         return cities;
//     } catch (error) {
//         console.error("Error fetching cities by state ID:", error);
//         throw new InternalServerErrorException('Failed to get cities by state ID');
//     }
// }

async getCitiesByStateId(stateId: string): Promise<City[]> {
  try {
      const cities = await this.cityRepository.findAll({ state: stateId }, { sort: { name: 1 }, limit: 1, populate: [{ path: 'state', populate: 'country' }] });
      return cities;
  } catch (error) {
      console.error("Error fetching cities by state ID:", error);
      throw new InternalServerErrorException('Failed to get cities by state ID');
  }
}

async getstateByCity(name: string): Promise<City> {
  const city = await this.cityRepository.findOne({ name: name }, {select:'name', populate: [{ path: 'state', populate: 'country' }] });
  return city;
}

  async getCityById(id: string): Promise<City | null> {
    return this.cityRepository.findById(id);
  }

  async updateCity(id: string, city: Partial<City>): Promise<City | null> {
    return this.cityRepository.update(id, city);
  }

  async deleteCity(id: string): Promise<City | null> {
    return this.cityRepository.delete(id);
  }
}
