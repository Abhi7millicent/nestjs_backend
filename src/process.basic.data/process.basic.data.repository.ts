import { Injectable } from '@nestjs/common';
import {  Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GenericRepository } from '../repositories/generic.repository';
import { ProcessBasicData } from './process.basic.data.schema';

@Injectable()
export class ProcessBasicDataRepository extends GenericRepository<ProcessBasicData> {
  constructor(@InjectModel(ProcessBasicData.name) userModel: Model<ProcessBasicData>) {
    super(userModel);
  }

  async updateActivities(id: string, activities: any): Promise<any> {
    return this.model.updateOne(
        { _id: id },
        { $set: { activities } },
        { new: true }
    ).exec();
}

  async updateWorkflows(id: string, workflows: any): Promise<any> {
    return this.model.updateOne(
        { _id: id },
        { $set: { workflows } },
        { new: true }
    ).exec();
}

  async updateDataManagement(id: string, dataManagement: any): Promise<any> {
    return this.model.updateOne(
        { _id: id },
        { $set: { dataManagement } },
        { new: true }
    ).exec();
}
  async updateProcessDocuments(id: string, processDocuments: any): Promise<any> {
    return this.model.updateOne(
      { _id: id },
      { $set: { processDocuments } },
      { new: true }
    ).exec();
  }
  async updateAutomationScenarios(id: string, automationScenarios: any): Promise<any> {
    return this.model.updateOne(
      { _id: id },
      { $set: { automationScenarios } },
      { new: true }
    ).exec();
  }
  async updateComplianceScenarios(id: string, complianceScenarios: any): Promise<any> {
    return this.model.updateOne(
      { _id: id },
      { $set: { complianceScenarios } },
      { new: true }
    ).exec();
  }
  async updateIntegrationScenario(id: string, integrationScenarios: any): Promise<any> {
    return this.model.updateOne(
      { _id: id },
      { $set: { integrationScenarios } },
      { new: true }
    ).exec();
  }
  async updateProcessControls(id: string, processControls: any): Promise<any> {
    return this.model.updateOne(
      { _id: id },
      { $set: { processControls } },
      { new: true }
    ).exec();
  }

//   async updateIntegrationScenario(id: string, integrationScenario: any) {
//     return this.update(id, integrationScenario);
//   }
}
