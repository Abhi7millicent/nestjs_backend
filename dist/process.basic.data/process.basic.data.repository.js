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
exports.ProcessBasicDataRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const generic_repository_1 = require("../repositories/generic.repository");
const process_basic_data_schema_1 = require("./process.basic.data.schema");
let ProcessBasicDataRepository = class ProcessBasicDataRepository extends generic_repository_1.GenericRepository {
    constructor(userModel) {
        super(userModel);
    }
    async updateActivities(id, activities) {
        return this.model.updateOne({ _id: id }, { $set: { activities } }, { new: true }).exec();
    }
    async updateWorkflows(id, workflows) {
        return this.model.updateOne({ _id: id }, { $set: { workflows } }, { new: true }).exec();
    }
    async updateDataManagement(id, dataManagement) {
        return this.model.updateOne({ _id: id }, { $set: { dataManagement } }, { new: true }).exec();
    }
    async updateProcessDocuments(id, processDocuments) {
        return this.model.updateOne({ _id: id }, { $set: { processDocuments } }, { new: true }).exec();
    }
    async updateAutomationScenarios(id, automationScenarios) {
        return this.model.updateOne({ _id: id }, { $set: { automationScenarios } }, { new: true }).exec();
    }
    async updateComplianceScenarios(id, complianceScenarios) {
        return this.model.updateOne({ _id: id }, { $set: { complianceScenarios } }, { new: true }).exec();
    }
    async updateIntegrationScenario(id, integrationScenarios) {
        return this.model.updateOne({ _id: id }, { $set: { integrationScenarios } }, { new: true }).exec();
    }
    async updateProcessControls(id, processControls) {
        return this.model.updateOne({ _id: id }, { $set: { processControls } }, { new: true }).exec();
    }
};
exports.ProcessBasicDataRepository = ProcessBasicDataRepository;
exports.ProcessBasicDataRepository = ProcessBasicDataRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(process_basic_data_schema_1.ProcessBasicData.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ProcessBasicDataRepository);
//# sourceMappingURL=process.basic.data.repository.js.map