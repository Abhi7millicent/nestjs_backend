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
const process_constants_1 = require("../constants/process.constants");
const process_utils_1 = require("../utils/process.utils");
let ProcessActivityService = class ProcessActivityService {
    constructor(processBasicDataRepository) {
        this.processBasicDataRepository = processBasicDataRepository;
    }
    async updateActivity(processId, activityId, activityDto) {
        const auditData = {
            last_modified_by: activityDto.last_modified_by,
            last_modified_on: new Date()
        };
        delete activityDto.last_modified_by;
        const data = await this.processBasicDataRepository.updateByKey(processId, (0, process_utils_1.findPath)(process_constants_1.PROCESS, "activities"), activityId, activityDto);
        if (data.acknowledged) {
            const updateResponseDto = await this.processBasicDataRepository.update({ _id: processId }, auditData);
            return updateResponseDto;
        }
        else {
            return data;
        }
    }
    async updateActivityIsDeleted(processId, activityId) {
        return this.processBasicDataRepository.deleteByKey(processId, (0, process_utils_1.findPath)(process_constants_1.PROCESS, "activities"), activityId);
    }
    async updateActivityIsSoftDeleted(processId, activityId) {
        return this.processBasicDataRepository.softDeleteByKey(processId, (0, process_utils_1.findPath)(process_constants_1.PROCESS, "activities"), activityId);
    }
    async addActivity(processId, activityDto) {
        activityDto._id = (0, process_utils_1.generateId)('activity_');
        const auditData = {
            last_modified_by: activityDto.last_modified_by,
            last_modified_on: new Date()
        };
        delete activityDto.last_modified_by;
        try {
            const data = await this.processBasicDataRepository.createByKey(processId, (0, process_utils_1.findPath)(process_constants_1.PROCESS, 'activities'), activityDto);
            if (data._id === activityDto._id) {
                const updateResponseDto = await this.processBasicDataRepository.update({ _id: processId }, auditData);
                console.log('updateMetaData:', updateResponseDto);
            }
            return data;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                console.error('Not Found Exception:', error.message);
                throw error;
            }
            else {
                console.error('Unexpected Error:', error.message);
                throw error;
            }
        }
    }
};
exports.ProcessActivityService = ProcessActivityService;
exports.ProcessActivityService = ProcessActivityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [process_basic_data_repository_1.ProcessBasicDataRepository])
], ProcessActivityService);
//# sourceMappingURL=process.basic.data.activity.service.js.map