import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { GenericRepository } from "src/repositories/generic.repository";
import { Country } from "./country.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CountryRepository extends GenericRepository<Country> {
    constructor(@InjectModel(Country.name) userModel: Model<Country>) {
        super(userModel);
      }
}