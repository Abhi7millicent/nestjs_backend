/// <reference types="mongoose/types/PipelineStage" />
import { Model } from 'mongoose';
import { GenericRepository } from '../repositories/generic.repository';
import { ProcessBasicData } from './process.basic.data.schema';
export declare class ProcessBasicDataRepository extends GenericRepository<ProcessBasicData> {
    constructor(userModel: Model<ProcessBasicData>);
    updateActivities(id: string, activities: any): Promise<any>;
    updateWorkflows(id: string, workflows: any): Promise<any>;
    updateDataManagement(id: string, dataManagement: any): Promise<any>;
    updateProcessDocuments(id: string, processDocuments: any): Promise<any>;
    updateAutomationScenarios(id: string, automationScenarios: any): Promise<any>;
    updateComplianceScenarios(id: string, complianceScenarios: any): Promise<any>;
    updateIntegrationScenario(id: string, integrationScenarios: any): Promise<any>;
    updateProcessControls(id: string, processControls: any): Promise<any>;
}
