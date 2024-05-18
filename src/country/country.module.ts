import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { Country, CountrySchema } from './country.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryRepository } from './country.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  providers: [CountryService,
    CountryRepository
  ],
  controllers: [CountryController]
})
export class CountryModule {}
