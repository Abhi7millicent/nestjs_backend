import { Module } from '@nestjs/common';
import { ProcessBasicDataService } from './process.basic.data.service';
import { ProcessBasicDataController } from './process.basic.data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessBasicData, ProcessBasicDataSchema } from './process.basic.data.schema';
import { ProcessBasicDataRepository } from './process.basic.data.repository';
import { ProcessActivityService } from './process.basic.data.activity.service';
import { ProcessWorkflowService } from './process.basic.data.workflow.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProcessBasicData.name, schema: ProcessBasicDataSchema }
    ])
  ],
  providers: [ProcessBasicDataService, ProcessBasicDataRepository, ProcessActivityService, ProcessWorkflowService],
  controllers: [ProcessBasicDataController]
})
export class ProcessBasicDataModule {}
