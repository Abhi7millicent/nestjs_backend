import { Injectable } from '@nestjs/common';
import { Country } from './country.schema';
import { CountryRepository } from './country.repository';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async createCountry(country: Partial<Country>): Promise<Country> {
    return this.countryRepository.create(country);
  }

  async getAllCountries(): Promise<Country[]> {
    return this.countryRepository.findAll();
  }

  async getCountryById(id: string): Promise<Country | null> {
    return this.countryRepository.findById(id);
  }

  async updateCountry(id: string, country: Partial<Country>): Promise<Country | null> {
    return this.countryRepository.update(id, country);
  }

  async deleteCountry(id: string): Promise<Country | null> {
    return this.countryRepository.delete(id);
  }
}
