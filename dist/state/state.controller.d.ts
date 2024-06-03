import { State } from './state.schema';
import { StateService } from './state.service';
export declare class StateController {
    private readonly stateService;
    constructor(stateService: StateService);
    createState(createStateDto: Partial<State>): Promise<State>;
    getAllStates(): Promise<State[]>;
    getStatesByCountryId(countryId: string): Promise<State[]>;
    getStateById(id: string): Promise<State | null>;
    updateState(id: string, updateStateDto: Partial<State>): Promise<State | null>;
    deleteState(id: string): Promise<State | null>;
}
