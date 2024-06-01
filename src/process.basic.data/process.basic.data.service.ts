import { Injectable, NotFoundException } from '@nestjs/common';
import { ProcessBasicDataRepository } from './process.basic.data.repository';
import { ProcessBasicData } from './process.basic.data.schema';

@Injectable()
export class ProcessBasicDataService {
  constructor(
    private readonly processBasicDataRepository: ProcessBasicDataRepository,
  ) {}

  async createProcessBasicData(createProcessDto: Partial<ProcessBasicData>) {
    try {
        const createdProcess = await this.processBasicDataRepository.create(createProcessDto);
        return createdProcess;
    } catch (error) {
        throw new Error(`Error creating process: ${error}`);
    }
}

async getAllProcessBasicData() {
  const process = await this.processBasicDataRepository.findAll({ 'is_deleted': 'false' });
 
  process.forEach(process => {
    process.activities = process.activities.filter(activity => activity.is_deleted === false);
});
  return process;
}

  async getProcessBasicDataById(id: string) {
    return this.processBasicDataRepository.findById(id);
  }

  // async updateProcessBasicData(id: string, data: Partial<ProcessBasicData>): Promise<ProcessBasicData> {
  //   return this.processBasicDataRepository.update({ _id: id }, data);
  // }

  async updateProcessBasicData(id: string, data: Partial<ProcessBasicData>): Promise<any> {
    const updateResponse = await this.processBasicDataRepository.update({ _id: id }, data);
    // Extract the updated document from the response
    // const updatedData = updateResponse.updatedData;
    
    // Return the updated document
    return updateResponse;
  }
  

  async deleteProcessBasicData(id: string) {
    return this.processBasicDataRepository.delete(id);
  }

  async softDeleteProcessBasicData(id: string) {
    return this.processBasicDataRepository.softDelete(id);
  }

  // async updateActivities(id: string, activities: any): Promise<any> {
  //   try {
  //       const updatedActivities = await this.processBasicDataRepository.updateActivities(id, activities);
  //       return updatedActivities;
  //   } catch (error) {
  //       throw error; 
  //   }
  // }

  // async updateActivity(
  //   processId: string,
  //   activityId: string,
  //   activityData: any,
  // ): Promise<any> {
  //   const process = await this.processBasicDataRepository.findById(processId);
  //   if (!process) {
  //     throw new NotFoundException('Process not found');
  //   }
  
  //   const activity = process.activities.find((data) => data._id === activityId);
  //   if (!activity) {
  //     throw new NotFoundException('Activity not found');
  //   }
  
  //   Object.keys(activityData).forEach((key) => {
  //     activity[key] = activityData[key];
  //   });
  
  //   process.last_modified_by = activityData.last_modified_by || process.last_modified_by;
  //   process.last_modified_on = new Date();
  
  //   await process.save();
  //   return process.activities.find((data) => data._id === activityId);
  // }

  // async updateActivity(
  //   processId: string,
  //   activityId: string,
  //   activityData: any
  // ): Promise<any> {
  //   return this.processBasicDataRepository.updateSubDocument(
  //       processId,
  //       'activities',
  //       activityId,
  //       activityData
  //   );
  // }

  // async addActivity(processId: string, createActivityDto: CreateActivityDto): Promise<ProcessBasicData> {
  //   createActivityDto._id = 'activity_' + Math.random().toString(36).substring(2, 11);
  //   const process = await this.processBasicDataRepository.findById(processId);
  //   if (!process) {
  //     throw new Error('Process not found');
  //   }
  //   process.activities.push(createActivityDto);
  //   return process.save();
  // }

  // async updateActivityIsDeleted(
  //   processId: string,
  //   activityId: string,
  // ): Promise<ProcessBasicData> {
  //   const process = await this.processBasicDataRepository.findById(processId);
  //   if (!process) {
  //     throw new NotFoundException('Process not found');
  //   }

  //   const activity = process.activities.find((act) => act._id === activityId);
  //   if (!activity) {
  //     throw new NotFoundException('Activity not found');
  //   }

  //   // Toggle the value of is_deleted and convert it to string
  //   activity.is_deleted = !activity.is_deleted;

  //   // Update last_modified_on
  //   process.last_modified_on = new Date();

  //   await process.save();
  //   return process;
  // }

  // async updateWorkflows(id: string, workflows: any): Promise<any> {
  //   return this.processBasicDataRepository.updateWorkflows(id, workflows);
  // }

  // async addWorkflows(processId: string, workflowsDto: WorkflowsDto): Promise<ProcessBasicData> {
  //   workflowsDto._id = 'wf_' + Math.random().toString(36).substring(2, 11);
  //   const process = await this.processBasicDataRepository.findById(processId);
  //   if (!process) {
  //     throw new Error('Process not found');
  //   }
  //   process.control_and_monitoring.workflows.push(workflowsDto);
  //   process.markModified('control_and_monitoring');
  //   return process.save();
  // }

  // async addkpis(processId: string, kpisDto: KpisDto): Promise<ProcessBasicData> {
  //   kpisDto._id = 'kpis_' + Math.random().toString(36).substring(2, 11);
  //   const process = await this.processBasicDataRepository.findById(processId);
  //   if (!process) {
  //     throw new Error('Process not found');
  //   }
  //   process.control_and_monitoring.kpis.push(kpisDto);
  //   process.markModified('control_and_monitoring');
  //   return process.save();
  // }

  // async addReports(processId: string, reportsDto: ReportsDto): Promise<ProcessBasicData> {
  //   reportsDto._id = 'report_' + Math.random().toString(36).substring(2, 11);
  //   const process = await this.processBasicDataRepository.findById(processId);
  //   if (!process) {
  //     throw new Error('Process not found');
  //   }
  //   process.control_and_monitoring.reports.push(reportsDto);
  //   process.markModified('control_and_monitoring');
  //   return process.save();
  // }

  // async addAnalyticalDashboards(processId: string, analyticalDashboardsDto: AnalyticalDashboardsDto): Promise<ProcessBasicData> {
  //   analyticalDashboardsDto._id = 'ad_' + Math.random().toString(36).substring(2, 11);
  //   const process = await this.processBasicDataRepository.findById(processId);
  //   if (!process) {
  //     throw new Error('Process not found');
  //   }
  //   process.control_and_monitoring.analytical_dashboards.push(analyticalDashboardsDto);
  //   process.markModified('control_and_monitoring');
  //   return process.save();
  // }

  // async addQueriesAndResponses(processId: string, queriesAndResponsesDto: QueriesAndResponsesDto): Promise<ProcessBasicData> {
  //   queriesAndResponsesDto._id = 'activity_' + Math.random().toString(36).substring(2, 11);
  //   const process = await this.processBasicDataRepository.findById(processId);
  //   if (!process) {
  //     throw new Error('Process not found');
  //   }
  //   process.queries_and_responses.push(queriesAndResponsesDto);
  //   return process.save();
  // }

  // async updateDataManagementArray(processId: string, newData: any) {
  //   return this.processBasicDataRepository.updateDataManagement(processId, newData);
  // }

  // async updateIntegrationScenario(id: string, integrationScenarioData: any) {
  //   return this.processBasicDataRepository.updateIntegrationScenario(id, integrationScenarioData);
  // }
  // async updateProcessDocuments(id: string, integrationScenarioData: any) {
  //   return this.processBasicDataRepository.updateProcessDocuments(id, integrationScenarioData);
  // }
  // async updateAutomationScenarios(id: string, integrationScenarioData: any) {
  //   return this.processBasicDataRepository.updateAutomationScenarios(id, integrationScenarioData);
  // }
  // async updateComplianceScenarios(id: string, integrationScenarioData: any) {
  //   return this.processBasicDataRepository.updateComplianceScenarios(id, integrationScenarioData);
  // }
  // async updateProcessControls(id: string, integrationScenarioData: any) {
  //   return this.processBasicDataRepository.updateProcessControls(id, integrationScenarioData);
  // }
  
}
