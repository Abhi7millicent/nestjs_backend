import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { State } from './state.schema';
import { StateRepository } from './state.repository';

@Injectable()
export class StateService {
  constructor(private readonly stateRepository: StateRepository) {}

  async createState(state: Partial<State>): Promise<State> {
    return this.stateRepository.create(state);
  }

  async getAllStates(): Promise<State[]> {
    return this.stateRepository.findAll();
  }

  async getStatesByCountryId(countryId: string): Promise<State[]> {
    try {
      const states = await this.stateRepository.findAll({ country: countryId });
      return states;
    } catch (error) {
      console.error("Error fetching states by country ID:", error);
      throw new InternalServerErrorException('Failed to get states by country ID');
    }
  }

  async getStateById(id: string): Promise<State | null> {
    return this.stateRepository.findById(id);
  }

  async updateState(id: string, state: Partial<State>): Promise<State | null> {
    return this.stateRepository.update1(id, state);
  }

  async deleteState(id: string): Promise<State | null> {
    return this.stateRepository.delete(id);
  }
}
