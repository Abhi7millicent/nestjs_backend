import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3236; // Default to port 3000 if not specified in .env
  await app.listen(port); 
}
bootstrap();