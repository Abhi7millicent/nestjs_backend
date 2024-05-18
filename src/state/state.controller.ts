import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { State } from './state.schema';
import { StateService } from './state.service';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  async createState(@Body() createStateDto: Partial<State>): Promise<State> {
    return this.stateService.createState(createStateDto);
  }

  @Get()
  async getAllStates(): Promise<State[]> {
    return this.stateService.getAllStates();
  }

  @Get('country/:countryId')
  async getStatesByCountryId(@Param('countryId') countryId: string): Promise<State[]> {
    return this.stateService.getStatesByCountryId(countryId);
  }

  @Get(':id')
  async getStateById(@Param('id') id: string): Promise<State | null> {
    return this.stateService.getStateById(id);
  }

  @Put(':id')
  async updateState(@Param('id') id: string, @Body() updateStateDto: Partial<State>): Promise<State | null> {
    return this.stateService.updateState(id, updateStateDto);
  }

  @Delete(':id')
  async deleteState(@Param('id') id: string): Promise<State | null> {
    return this.stateService.deleteState(id);
  }
}
