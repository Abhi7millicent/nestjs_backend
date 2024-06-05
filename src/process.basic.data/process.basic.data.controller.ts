import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, NotFoundException, HttpException } from '@nestjs/common';
import { ProcessBasicDataService } from './process.basic.data.service';
import { ProcessBasicData } from './process.basic.data.schema';
import { AnalyticalDashboardsDto, ActivityDto, KpisDto, QueriesAndResponsesDto, ReportsDto, WorkflowsDto } from 'src/dto/process.dto';
import { ProcessActivityService } from './process.basic.data.activity.service';
import { ProcessWorkflowService } from './process.basic.data.workflow.service';

@Controller('process-basic-data')
export class ProcessBasicDataController {
  constructor(
    private readonly processBasicDataService: ProcessBasicDataService,
    private readonly processActivityService: ProcessActivityService,
    private readonly processWorkflowService: ProcessWorkflowService,
  ) {}

  @Post()
  async create(@Body() createProcessDto: ProcessBasicData) {
    return this.processBasicDataService.createProcessBasicData(createProcessDto);
  }

  @Get()
  async getAll(): Promise<ProcessBasicData[]> {
    
    return this.processBasicDataService.getAllProcessBasicData();
    
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ProcessBasicData> {
    return this.processBasicDataService.getProcessBasicDataById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<ProcessBasicData>): Promise<ProcessBasicData> {
    return this.processBasicDataService.updateProcessBasicData(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProcessBasicData> {
    return this.processBasicDataService.deleteProcessBasicData(id);
  }

  // @Put('activities/:id')
  // async updateActivity(@Param('id') id: string, @Body() activities: any): Promise<any> {
  //     return this.processBasicDataService.updateActivities(id, activities);
  // }

  @Post('activities/:id')
  @HttpCode(HttpStatus.CREATED) // Setting default success status code to 201 Created
  async addActivity(@Param('id') id: string, @Body() activityDto: ActivityDto) {
    try {
      const data = await this.processActivityService.addActivity(id, activityDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Activity created successfully',
        data: data,
      };
    } catch (error) {
      console.error('Error in addActivity controller method:', error.message);

      // Handle specific known errors
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        // Handle unexpected errors
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Put(':processId/activities/:activityId')
  async updateActivity(
    @Param('processId') processId: string,
    @Param('activityId') activityId: string,
    @Body() activityData: any,
  ): Promise<any> {
    return this.processActivityService.updateActivity(processId, activityId, activityData);
  }

  @Put(':processId/activities-delete/:activityId')
  async updateActivityIsDeleted(
    @Param('processId') processId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.processActivityService.updateActivityIsDeleted(processId, activityId);
  }

  @Put(':processId/activities-soft-delete/:activityId')
  async updateActivityIsSoftDeleted(
    @Param('processId') processId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.processActivityService.updateActivityIsSoftDeleted(processId, activityId);
  }

  // @Put('work-flows/:id')
  //   async updateWorkflows(@Param('id') id: string, @Body() workflows: any): Promise<any> {
  //   return this.processBasicDataService.updateWorkflows(id, workflows);
  // }

  @Post('work-flows/:id')
    async addWorkflows(@Param('id') id: string, @Body() workflowsDto: WorkflowsDto) {
    return this.processWorkflowService.addWorkflows(id, workflowsDto);
  }

  @Put(':processId/workflows/:workflowId')
  async updateWorkflow(
    @Param('processId') processId: string,
    @Param('workflowId') workflowId: string,
    @Body() workflowData: any,
  ): Promise<any> {
    return this.processWorkflowService.updateWorkflow(processId, workflowId, workflowData);
  }

  @Put(':processId/workflows-delete/:workflowId')
  async updateWorkflowsIsDeleted(
    @Param('processId') processId: string,
    @Param('workflowId') workflowId: string,
  ) {
    return this.processWorkflowService.updateWorkflowsIsDeleted(processId, workflowId);
  }

  @Put(':processId/workflows-soft-delete/:workflowId')
  async updateWorkflowsIsSoftDeleted(
    @Param('processId') processId: string,
    @Param('workflowId') workflowId: string,
  ) {
    return this.processWorkflowService.updateWorkflowsIsSoftDeleted(processId, workflowId);
  }
  
  // @Post('kpis/:id')
  //   async addkpis(@Param('id') id: string, @Body() kpisDto: KpisDto) {
  //   return this.processBasicDataService.addkpis(id, kpisDto);
  // }

  // @Post('report/:id')
  //   async addReports(@Param('id') id: string, @Body() reportsDto: ReportsDto) {
  //   return this.processBasicDataService.addReports(id, reportsDto);
  // }

  // @Post('analytical-dashboards/:id')
  //   async addAnalyticalDashboards(@Param('id') id: string, @Body() analyticalDashboardsDto: AnalyticalDashboardsDto) {
  //   return this.processBasicDataService.addAnalyticalDashboards(id, analyticalDashboardsDto);
  // }

  // @Post('queries-and-responses/:id')
  //   async addQueriesAndResponses(@Param('id') id: string, @Body() queriesAndResponsesDto: QueriesAndResponsesDto) {
  //   return this.processBasicDataService.addQueriesAndResponses(id, queriesAndResponsesDto);
  // }

  // @Put(':id/data-management')
  // async updateDataManagement(@Param('id') id: string, @Body() dataManagement: any) {
  //   return this.processBasicDataService.updateDataManagementArray(id, dataManagement);
  // }

  // @Put('integration-scenarios/:id')
  // async updateIntegrationScenario(@Param('id') id: string, @Body() integrationScenarioData: any) {
  //   return this.processBasicDataService.updateIntegrationScenario(id, integrationScenarioData);
  // }
  // @Put('process-documents/:id')
  // async updateprocessDocuments(@Param('id') id: string, @Body() integrationScenarioData: any) {
  //   return this.processBasicDataService.updateProcessDocuments(id, integrationScenarioData);
  // }
  // @Put('automation-scenarios/:id')
  // async updateautomationScenarios(@Param('id') id: string, @Body() integrationScenarioData: any) {
  //   return this.processBasicDataService.updateAutomationScenarios(id, integrationScenarioData);
  // }
  // @Put('compliance-scenarios/:id')
  // async updatecomplianceScenarios(@Param('id') id: string, @Body() integrationScenarioData: any) {
  //   return this.processBasicDataService.updateComplianceScenarios(id, integrationScenarioData);
  // }
  // @Put('process-controls/:id')
  // async updateprocessControls(@Param('id') id: string, @Body() integrationScenarioData: any) {
  //   return this.processBasicDataService.updateProcessControls(id, integrationScenarioData);
  // }
}
