import { Injectable } from "@nestjs/common";
import { ProcessBasicDataRepository } from "./process.basic.data.repository";
import { WorkflowsDto } from "src/dto/process.dto";
import { PROCESS, controlAndMonitoring, workflow } from "src/constants/process.constants";
import { findPath, generateId } from "src/utils/process.utils";

@Injectable()

export class ProcessWorkflowService {
    constructor(
        private readonly processBasicDataRepository: ProcessBasicDataRepository,
    ) {}

    async updateWorkflow(
        processId: string,
        workflowId: string,
        workflowsDto: WorkflowsDto
    ): Promise<any> {
        const auditData = {
            last_modified_by: workflowsDto.last_modified_by,
            last_modified_on: new Date()
        };
        delete workflowsDto.last_modified_by;
        const data = await this.processBasicDataRepository.updateByKey(
        processId,
        findPath(PROCESS, controlAndMonitoring["workflows"]),
        workflowId,
        workflowsDto,
        );
        if(data.acknowledged){
            const updateResponseDto = await this.processBasicDataRepository.update(
                { _id: processId },
                auditData
            );
            return updateResponseDto;
        } else {
            return data;
        }
    }

    async addWorkflows(
        processId: string,
        workflowsDto: WorkflowsDto
    ): Promise<any> {
        try {
            workflowsDto._id = generateId(workflow);
            
            const auditData = {
                last_modified_by: workflowsDto.last_modified_by,
                last_modified_on: new Date()
            };
            
            delete workflowsDto.last_modified_by;
            const data = await this.processBasicDataRepository.createByKey(
                processId,
                findPath(PROCESS, controlAndMonitoring["workflows"]),
                workflowsDto,
            );
            console.log("data:", data);
            if (data._id === workflowsDto._id) {
               const updateResponseDto = await this.processBasicDataRepository.update(
                    { _id: processId },
                    auditData
                );
                console.log("updateMetaData:", updateResponseDto);
            }
            
            return data;
        } catch (error) {
            console.error('Error in addWorkflows:', error);
            throw new Error(`Failed to add workflows: ${error.message}`);
        }
    }
    

    async updateWorkflowsIsDeleted(
        processId: string,
        workflowId: string,
      ): Promise<any> {
        return this.processBasicDataRepository.deleteByKey(
            processId,
            findPath(PROCESS, controlAndMonitoring["workflows"]),
            workflowId,
        );
      }

      async updateWorkflowsIsSoftDeleted(
        processId: string,
        workflowId: string,
      ): Promise<any> {
        return this.processBasicDataRepository.softDeleteByKey(
            processId,
            findPath(PROCESS, controlAndMonitoring["workflows"]),
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