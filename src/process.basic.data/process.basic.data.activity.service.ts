import { Injectable } from "@nestjs/common";
import { ProcessBasicDataRepository } from "./process.basic.data.repository";
import { CreateActivityDto } from "src/dto/process.dto";

@Injectable()
export class ProcessActivityService {
    constructor(
        private readonly processBasicDataRepository: ProcessBasicDataRepository,
    ) {}

    async updateActivity(
        processId: string,
        activityId: string,
        activityData: any
    ): Promise<any> {
        return this.processBasicDataRepository.updateByKey(
            processId,
            ['activities'],
            activityId,
            activityData
        );
    }

      async updateActivityIsDeleted(
        processId: string,
        activityId: string,
      ): Promise<any> {
        return this.processBasicDataRepository.deleteByKey(
            processId,
            ['activities'],
            activityId,
        );
      }

      async updateActivityIsSoftDeleted(
        processId: string,
        activityId: string,
      ): Promise<any> {
        return this.processBasicDataRepository.softDeleteByKey(
            processId,
            ['activities'],
            activityId,
        );
      }

      async addActivity(
        processId: string,
         createActivityDto: CreateActivityDto
        ): Promise<any> {
        createActivityDto._id = 'activity_' + Math.random().toString(36).substring(2, 11);
        return this.processBasicDataRepository.createByKey(
            processId,
            ['activities'],
            createActivityDto,
        )
        };
    
    // async addActivity(processId: string, createActivityDto: CreateActivityDto): Promise<ProcessBasicData> {
    //     createActivityDto._id = 'activity_' + Math.random().toString(36).substring(2, 11);
    //     const process = await this.processBasicDataRepository.findById(processId);
    //     if (!process) {
    //       throw new Error('Process not found');
    //     }
    //     process.activities.push(createActivityDto);
    //     return process.save();
    // }
}