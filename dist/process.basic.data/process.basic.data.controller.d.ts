import { HttpStatus } from '@nestjs/common';
import { ProcessBasicDataService } from './process.basic.data.service';
import { ProcessBasicData } from './process.basic.data.schema';
import { ActivityDto, WorkflowsDto } from 'src/dto/process.dto';
import { ProcessActivityService } from './process.basic.data.activity.service';
import { ProcessWorkflowService } from './process.basic.data.workflow.service';
export declare class ProcessBasicDataController {
    private readonly processBasicDataService;
    private readonly processActivityService;
    private readonly processWorkflowService;
    constructor(processBasicDataService: ProcessBasicDataService, processActivityService: ProcessActivityService, processWorkflowService: ProcessWorkflowService);
    create(createProcessDto: ProcessBasicData): Promise<ProcessBasicData>;
    getAll(): Promise<ProcessBasicData[]>;
    getById(id: string): Promise<ProcessBasicData>;
    update(id: string, data: Partial<ProcessBasicData>): Promise<ProcessBasicData>;
    delete(id: string): Promise<ProcessBasicData>;
    addActivity(id: string, activityDto: ActivityDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    updateActivity(processId: string, activityId: string, activityData: any): Promise<any>;
    updateActivityIsDeleted(processId: string, activityId: string): Promise<any>;
    updateActivityIsSoftDeleted(processId: string, activityId: string): Promise<any>;
    addWorkflows(id: string, workflowsDto: WorkflowsDto): Promise<any>;
    updateWorkflow(processId: string, workflowId: string, workflowData: any): Promise<any>;
    updateWorkflowsIsDeleted(processId: string, workflowId: string): Promise<any>;
    updateWorkflowsIsSoftDeleted(processId: string, workflowId: string): Promise<any>;
}
