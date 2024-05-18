import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Country } from './country.schema';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  async createCountry(@Body() createCountryDto: Partial<Country>): Promise<Country> {
    return this.countryService.createCountry(createCountryDto);
  }

  @Get()
  async getAllCountries(): Promise<Country[]> {
    return this.countryService.getAllCountries();
  }

  @Get(':id')
  async getCountryById(@Param('id') id: string): Promise<Country | null> {
    return this.countryService.getCountryById(id);
  }

  @Put(':id')
  async updateCountry(@Param('id') id: string, @Body() updateCountryDto: Partial<Country>): Promise<Country | null> {
    return this.countryService.updateCountry(id, updateCountryDto);
  }

  @Delete(':id')
  async deleteCountry(@Param('id') id: string): Promise<Country | null> {
    return this.countryService.deleteCountry(id);
  }
}
