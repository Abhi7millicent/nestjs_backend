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
exports.ProcessActivityService = void 0;
const common_1 = require("@nestjs/common");
const process_basic_data_repository_1 = require("./process.basic.data.repository");
let ProcessActivityService = class ProcessActivityService {
    constructor(processBasicDataRepository) {
        this.processBasicDataRepository = processBasicDataRepository;
    }
    async updateActivity(processId, activityId, activityData) {
        return this.processBasicDataRepository.updateByKey(processId, ['activities'], activityId, activityData);
    }
    async updateActivityIsDeleted(processId, activityId) {
        return this.processBasicDataRepository.deleteByKey(processId, ['activities'], activityId);
    }
    async updateActivityIsSoftDeleted(processId, activityId) {
        return this.processBasicDataRepository.softDeleteByKey(processId, ['activities'], activityId);
    }
    async addActivity(processId, createActivityDto) {
        createActivityDto._id = 'activity_' + Math.random().toString(36).substring(2, 11);
        return this.processBasicDataRepository.createByKey(processId, ['activities'], createActivityDto);
    }
    ;
};
exports.ProcessActivityService = ProcessActivityService;
exports.ProcessActivityService = ProcessActivityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [process_basic_data_repository_1.ProcessBasicDataRepository])
], ProcessActivityService);
//# sourceMappingURL=process.basic.data.activity.service.js.map