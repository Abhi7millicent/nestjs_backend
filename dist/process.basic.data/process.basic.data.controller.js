"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessBasicDataController = void 0;
const common_1 = require("@nestjs/common");
const process_basic_data_service_1 = require("./process.basic.data.service");
const process_basic_data_schema_1 = require("./process.basic.data.schema");
const process_dto_1 = require("../dto/process.dto");
const process_basic_data_activity_service_1 = require("./process.basic.data.activity.service");
const process_basic_data_workflow_service_1 = require("./process.basic.data.workflow.service");
let ProcessBasicDataController = class ProcessBasicDataController {
    constructor(processBasicDataService, processActivityService, processWorkflowService) {
        this.processBasicDataService = processBasicDataService;
        this.processActivityService = processActivityService;
        this.processWorkflowService = processWorkflowService;
    }
    async create(createProcessDto) {
        return this.processBasicDataService.createProcessBasicData(createProcessDto);
    }
    async getAll() {
        return this.processBasicDataService.getAllProcessBasicData();
    }
    async getById(id) {
        return this.processBasicDataService.getProcessBasicDataById(id);
    }
    async update(id, data) {
        return this.processBasicDataService.updateProcessBasicData(id, data);
    }
    async delete(id) {
        return this.processBasicDataService.deleteProcessBasicData(id);
    }
    async addActivity(id, activityDto) {
        try {
            const data = await this.processActivityService.addActivity(id, activityDto);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Activity created successfully',
                data: data,
            };
        }
        catch (error) {
            console.error('Error in addActivity controller method:', error.message);
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: error.message,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Internal server error',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async updateActivity(processId, activityId, activityData) {
        return this.processActivityService.updateActivity(processId, activityId, activityData);
    }
    async updateActivityIsDeleted(processId, activityId) {
        return this.processActivityService.updateActivityIsDeleted(processId, activityId);
    }
    async updateActivityIsSoftDeleted(processId, activityId) {
        return this.processActivityService.updateActivityIsSoftDeleted(processId, activityId);
    }
    async addWorkflows(id, workflowsDto) {
        return this.processWorkflowService.addWorkflows(id, workflowsDto);
    }
    async updateWorkflow(processId, workflowId, workflowData) {
        return this.processWorkflowService.updateWorkflow(processId, workflowId, workflowData);
    }
    async updateWorkflowsIsDeleted(processId, workflowId) {
        return this.processWorkflowService.updateWorkflowsIsDeleted(processId, workflowId);
    }
    async updateWorkflowsIsSoftDeleted(processId, workflowId) {
        return this.processWorkflowService.updateWorkflowsIsSoftDeleted(processId, workflowId);
    }
};
exports.ProcessBasicDataController = ProcessBasicDataController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [process_basic_data_schema_1.ProcessBasicData]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('activities/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, process_dto_1.ActivityDto]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "addActivity", null);
__decorate([
    (0, common_1.Put)(':processId/activities/:activityId'),
    __param(0, (0, common_1.Param)('processId')),
    __param(1, (0, common_1.Param)('activityId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "updateActivity", null);
__decorate([
    (0, common_1.Put)(':processId/activities-delete/:activityId'),
    __param(0, (0, common_1.Param)('processId')),
    __param(1, (0, common_1.Param)('activityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "updateActivityIsDeleted", null);
__decorate([
    (0, common_1.Put)(':processId/activities-soft-delete/:activityId'),
    __param(0, (0, common_1.Param)('processId')),
    __param(1, (0, common_1.Param)('activityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "updateActivityIsSoftDeleted", null);
__decorate([
    (0, common_1.Post)('work-flows/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, process_dto_1.WorkflowsDto]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "addWorkflows", null);
__decorate([
    (0, common_1.Put)(':processId/workflows/:workflowId'),
    __param(0, (0, common_1.Param)('processId')),
    __param(1, (0, common_1.Param)('workflowId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "updateWorkflow", null);
__decorate([
    (0, common_1.Put)(':processId/workflows-delete/:workflowId'),
    __param(0, (0, common_1.Param)('processId')),
    __param(1, (0, common_1.Param)('workflowId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "updateWorkflowsIsDeleted", null);
__decorate([
    (0, common_1.Put)(':processId/workflows-soft-delete/:workflowId'),
    __param(0, (0, common_1.Param)('processId')),
    __param(1, (0, common_1.Param)('workflowId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProcessBasicDataController.prototype, "updateWorkflowsIsSoftDeleted", null);
exports.ProcessBasicDataController = ProcessBasicDataController = __decorate([
    (0, common_1.Controller)('process-basic-data'),
    __metadata("design:paramtypes", [process_basic_data_service_1.ProcessBasicDataService,
        process_basic_data_activity_service_1.ProcessActivityService,
        process_basic_data_workflow_service_1.ProcessWorkflowService])
], ProcessBasicDataController);
//# sourceMappingURL=process.basic.data.controller.js.map