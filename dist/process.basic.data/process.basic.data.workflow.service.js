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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessWorkflowService = void 0;
const common_1 = require("@nestjs/common");
const process_basic_data_repository_1 = require("./process.basic.data.repository");
let ProcessWorkflowService = class ProcessWorkflowService {
    constructor(processBasicDataRepository) {
        this.processBasicDataRepository = processBasicDataRepository;
    }
    async updateWorkflow(processId, workflowId, workflowData) {
        return this.processBasicDataRepository.updateByKey(processId, ['control_and_monitoring', 'workflows'], workflowId, workflowData);
    }
    async addWorkflows(processId, workflowsDto) {
        workflowsDto._id = 'wf_' + Math.random().toString(36).substring(2, 11);
        return this.processBasicDataRepository.createByKey(processId, ['control_and_monitoring', 'workflows'], workflowsDto);
    }
    ;
    async updateWorkflowsIsDeleted(processId, workflowId) {
        return this.processBasicDataRepository.deleteByKey(processId, ['control_and_monitoring', 'workflows'], workflowId);
    }
    async updateWorkflowsIsSoftDeleted(processId, workflowId) {
        return this.processBasicDataRepository.softDeleteByKey(processId, ['control_and_monitoring', 'workflows'], workflowId);
    }
};
exports.ProcessWorkflowService = ProcessWorkflowService;
exports.ProcessWorkflowService = ProcessWorkflowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [process_basic_data_repository_1.ProcessBasicDataRepository])
], ProcessWorkflowService);
//# sourceMappingURL=process.basic.data.workflow.service.js.map