import { State } from './state.schema';
import { StateRepository } from './state.repository';
export declare class StateService {
    private readonly stateRepository;
    constructor(stateRepository: StateRepository);
    createState(state: Partial<State>): Promise<State>;
    getAllStates(): Promise<State[]>;
    getStatesByCountryId(countryId: string): Promise<State[]>;
    getStateById(id: string): Promise<State | null>;
    updateState(id: string, state: Partial<State>): Promise<State | null>;
    deleteState(id: string): Promise<State | null>;
}
