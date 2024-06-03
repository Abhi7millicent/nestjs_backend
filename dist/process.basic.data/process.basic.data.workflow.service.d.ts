import { ProcessBasicDataRepository } from "./process.basic.data.repository";
import { WorkflowsDto } from "src/dto/process.dto";
export declare class ProcessWorkflowService {
    private readonly processBasicDataRepository;
    constructor(processBasicDataRepository: ProcessBasicDataRepository);
    updateWorkflow(processId: string, workflowId: string, workflowData: any): Promise<any>;
    addWorkflows(processId: string, workflowsDto: WorkflowsDto): Promise<any>;
    updateWorkflowsIsDeleted(processId: string, workflowId: string): Promise<any>;
    updateWorkflowsIsSoftDeleted(processId: string, workflowId: string): Promise<any>;
}
