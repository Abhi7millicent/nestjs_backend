import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { City, CitySchema } from './city.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CityRepository } from './citry.repository';
import { AthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    AthenticationModule
  ],
  controllers: [CityController],
  providers: [CityService,
    CityRepository
  ]
})
export class CityModule {}
