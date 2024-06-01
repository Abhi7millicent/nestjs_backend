import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { AthenticationModule } from './authentication/authentication.module';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { ProcessBasicDataModule } from './process.basic.data/process.basic.data.module';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI), 
    UserModule, AthenticationModule, CountryModule, StateModule, CityModule, ProcessBasicDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
