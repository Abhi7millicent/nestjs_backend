import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { City } from './city.schema';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async createCity(@Body() createCityDto: Partial<City>): Promise<City> {
    return this.cityService.createCity(createCityDto);
  }

  @Get()
  async getAllCities(): Promise<City[]> {
    return this.cityService.getAllCities();
  }

  @Get('state/:stateId')
  async getStatesByCountryId(@Param('stateId') stateId: string): Promise<City[]> {
    return this.cityService.getCitiesByStateId(stateId);
  }
  @Get('city/:name')
  async getstateByCity(@Param('name') name: string): Promise<City | null> {
    return this.cityService.getstateByCity(name);
  }

  @Get(':id')
  async getCityById(@Param('id') id: string): Promise<City | null> {
    return this.cityService.getCityById(id);
  }

  @Put(':id')
  async updateCity(@Param('id') id: string, @Body() updateCityDto: Partial<City>): Promise<City | null> {
    return this.cityService.updateCity(id, updateCityDto);
  }

  @Delete(':id')
  async deleteCity(@Param('id') id: string): Promise<City | null> {
    return this.cityService.deleteCity(id);
  }
}
