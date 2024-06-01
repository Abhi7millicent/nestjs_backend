import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { City } from './city.schema';
import { CityRepository } from './citry.repository';
import { PopulatedDoc } from 'mongoose';

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

// async getCitiesByStateId(stateId: string): Promise<City[]> {
//   try {
//       const cities = await this.cityRepository.findAll({ state: stateId }, { sort: { name: 1 }, limit: 1, populate: [{ path: 'state', populate: 'country' }] });
//       return cities;
//   } catch (error) {
//       console.error("Error fetching cities by state ID:", error);
//       throw new InternalServerErrorException('Failed to get cities by state ID');
//   }
// }

// async getstateByCity(name: string): Promise<City> {
//   const city = await this.cityRepository.findOne({ name: name }, {select:'name', populate: [{ path: 'state', populate: 'country' }] });
//   return city;
// }

  async getstateByCity(name: string): Promise<PopulatedDoc<City>> {
    const city = await this.cityRepository.findOneOrFailParam({ name: name }, 'name', [{ path: 'state', populate: 'country' }]);
    return city;
  }

  async getCityById(id: string): Promise<City | null> {
    return this.cityRepository.findById(id);
  }

  async updateCity(id: string, city: Partial<City>): Promise<City | null> {
    return this.cityRepository.update1(id, city);
  }

  async deleteCity(id: string): Promise<City | null> {
    return this.cityRepository.delete(id);
  }

  async getCitiesWithLimit(stateId: string): Promise<City[]> {
    try {
      return await this.cityRepository.findAllWithLimit({ state: stateId }, 3); 
    } catch (error) {
      console.error("Error fetching cities with limit:", error);
      throw new InternalServerErrorException('Failed to get cities with limit');
    }
  }

  async getCitiesWithSkip(stateId: string): Promise<City[]> {
    try {
      return await this.cityRepository.findAllWithSkip({ state: stateId }, 4);
    } catch (error) {
      console.error("Error fetching cities with skip:", error);
      throw new InternalServerErrorException('Failed to get cities with skip');
    }
  }

  async getCitiesWithSelect(stateId: string): Promise<City[]> {
    try {
      return await this.cityRepository.findAllWithSelect({ state: stateId }, 'name'); 
    } catch (error) {
      console.error("Error fetching cities with select:", error);
      throw new InternalServerErrorException('Failed to get cities with select');
    }
  }

  async getCitiesWithPopulate(stateId: string): Promise<City[]> {
    try {
      const populateOption = [{ path: 'state', populate: 'country' }];
      return await this.cityRepository.findAllWithPopulate({ state: stateId }, populateOption);
    } catch (error) {
      console.error("Error fetching cities with populate:", error);
      throw new InternalServerErrorException('Failed to get cities with populate');
    }
  }

  async getCitiesAscendingByName(stateId: string): Promise<City[]> {
    try {
      return await this.cityRepository.findAllAscending('name', { state: stateId });
    } catch (error) {
      console.error("Error fetching cities in ascending order by name:", error);
      throw new InternalServerErrorException('Failed to get cities in ascending order by name');
    }
  }

  async getCitiesDescendingByName(stateId: string): Promise<City[]> {
    try {
      return await this.cityRepository.findAllDescending('name', { state: stateId });
    } catch (error) {
      console.error("Error fetching cities in descending order by name:", error);
      throw new InternalServerErrorException('Failed to get cities in descending order by name');
    }
  }

  async getCitiesByStateId(stateId: string): Promise<PopulatedDoc<City>[]> {
    try {
      const criteria = { state: stateId };
      const sort = { name: 1 };
      const limit = 1;
      const select = 'name';
      const populate = [{ path: 'state', populate: 'country' }];
      const cities = await this.cityRepository.findAllParam(criteria, sort, limit, select, undefined, populate);
      return cities;
    } catch (error) {
      console.error("Error fetching cities by state ID:", error);
      throw new InternalServerErrorException('Failed to get cities by state ID');
    }
  }
}
