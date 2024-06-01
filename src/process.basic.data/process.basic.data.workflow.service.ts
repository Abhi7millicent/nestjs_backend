import { Injectable } from "@nestjs/common";
import { ProcessBasicDataRepository } from "./process.basic.data.repository";
import { WorkflowsDto } from "src/dto/process.dto";
import { ProcessBasicData } from "./process.basic.data.schema";

@Injectable()

export class ProcessWorkflowService {
    constructor(
        private readonly processBasicDataRepository: ProcessBasicDataRepository,
    ) {}

    async updateWorkflow(
        processId: string,
        workflowId: string,
        workflowData: any
    ): Promise<any> {
        return this.processBasicDataRepository.updateByKey(
            processId,
    ['control_and_monitoring', 'workflows'],
    workflowId,
    workflowData
        );
    }

    async addWorkflows(
        processId: string,
        workflowsDto: WorkflowsDto
        ): Promise<any> {
        workflowsDto._id = 'wf_' + Math.random().toString(36).substring(2, 11);
        return this.processBasicDataRepository.createByKey(
            processId,
            ['control_and_monitoring', 'workflows'],
            workflowsDto,
        )
    };

    async updateWorkflowsIsDeleted(
        processId: string,
        workflowId: string,
      ): Promise<any> {
        return this.processBasicDataRepository.deleteByKey(
            processId,
            ['control_and_monitoring', 'workflows'],
            workflowId,
        );
      }

      async updateWorkflowsIsSoftDeleted(
        processId: string,
        workflowId: string,
      ): Promise<any> {
        return this.processBasicDataRepository.softDeleteByKey(
            processId,
            ['control_and_monitoring', 'workflows'],
            workflowId,
        );
      }
    

    // async addWorkflows(processId: string, workflowsDto: WorkflowsDto): Promise<ProcessBasicData> {
    //     workflowsDto._id = 'wf_' + Math.random().toString(36).substring(2, 11);
    //     const process = await this.processBasicDataRepository.findById(processId);
    //     if (!process) {
    //       throw new Error('Process not found');
    //     }
    //     process.control_and_monitoring.workflows.push(workflowsDto);
    //     process.markModified('control_and_monitoring');
    //     process.last_modified_by = "Editor";
    //     process.last_modified_on = new Date;
    //     return process.save();
    // }

}