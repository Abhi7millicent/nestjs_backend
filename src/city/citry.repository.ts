import { Injectable } from "@nestjs/common";
import { GenericRepository } from "src/repositories/generic.repository";
import { Model } from 'mongoose';
import { City } from "./city.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CityRepository extends GenericRepository<City> {
  constructor(@InjectModel(City.name) cityModel: Model<City>) {
    super(cityModel);
  }
}