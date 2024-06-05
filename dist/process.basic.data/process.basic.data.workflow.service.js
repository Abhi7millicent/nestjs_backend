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
const process_constants_1 = require("../constants/process.constants");
const process_utils_1 = require("../utils/process.utils");
let ProcessWorkflowService = class ProcessWorkflowService {
    constructor(processBasicDataRepository) {
        this.processBasicDataRepository = processBasicDataRepository;
    }
    async updateWorkflow(processId, workflowId, workflowsDto) {
        const auditData = {
            last_modified_by: workflowsDto.last_modified_by,
            last_modified_on: new Date()
        };
        delete workflowsDto.last_modified_by;
        const data = await this.processBasicDataRepository.updateByKey(processId, (0, process_utils_1.findPath)(process_constants_1.PROCESS, process_constants_1.controlAndMonitoring["workflows"]), workflowId, workflowsDto);
        if (data.acknowledged) {
            const updateResponseDto = await this.processBasicDataRepository.update({ _id: processId }, auditData);
            return updateResponseDto;
        }
        else {
            return data;
        }
    }
    async addWorkflows(processId, workflowsDto) {
        try {
            workflowsDto._id = (0, process_utils_1.generateId)(process_constants_1.workflow);
            const auditData = {
                last_modified_by: workflowsDto.last_modified_by,
                last_modified_on: new Date()
            };
            delete workflowsDto.last_modified_by;
            const data = await this.processBasicDataRepository.createByKey(processId, (0, process_utils_1.findPath)(process_constants_1.PROCESS, process_constants_1.controlAndMonitoring["workflows"]), workflowsDto);
            console.log("data:", data);
            if (data._id === workflowsDto._id) {
                const updateResponseDto = await this.processBasicDataRepository.update({ _id: processId }, auditData);
                console.log("updateMetaData:", updateResponseDto);
            }
            return data;
        }
        catch (error) {
            console.error('Error in addWorkflows:', error);
            throw new Error(`Failed to add workflows: ${error.message}`);
        }
    }
    async updateWorkflowsIsDeleted(processId, workflowId) {
        return this.processBasicDataRepository.deleteByKey(processId, (0, process_utils_1.findPath)(process_constants_1.PROCESS, process_constants_1.controlAndMonitoring["workflows"]), workflowId);
    }
    async updateWorkflowsIsSoftDeleted(processId, workflowId) {
        return this.processBasicDataRepository.softDeleteByKey(processId, (0, process_utils_1.findPath)(process_constants_1.PROCESS, process_constants_1.controlAndMonitoring["workflows"]), workflowId);
    }
};
exports.ProcessWorkflowService = ProcessWorkflowService;
exports.ProcessWorkflowService = ProcessWorkflowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [process_basic_data_repository_1.ProcessBasicDataRepository])
], ProcessWorkflowService);
//# sourceMappingURL=process.basic.data.workflow.service.js.map