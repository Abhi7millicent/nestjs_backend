/// <reference types="mongoose/types/PipelineStage" />
import { GenericRepository } from "src/repositories/generic.repository";
import { State } from "./state.schema";
import { Model } from 'mongoose';
export declare class StateRepository extends GenericRepository<State> {
    constructor(stateModel: Model<State>);
}
