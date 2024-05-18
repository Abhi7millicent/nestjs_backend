import { Injectable } from "@nestjs/common";
import { GenericRepository } from "src/repositories/generic.repository";
import { State } from "./state.schema";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class StateRepository extends GenericRepository<State> {
  constructor(@InjectModel(State.name) stateModel: Model<State>) {
    super(stateModel);
  }
}