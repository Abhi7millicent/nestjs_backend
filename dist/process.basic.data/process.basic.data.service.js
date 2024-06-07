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
exports.ProcessBasicDataService = void 0;
const common_1 = require("@nestjs/common");
const process_basic_data_repository_1 = require("./process.basic.data.repository");
let ProcessBasicDataService = class ProcessBasicDataService {
    constructor(processBasicDataRepository) {
        this.processBasicDataRepository = processBasicDataRepository;
    }
    async createProcessBasicData(createProcessDto) {
        try {
            const createdProcess = await this.processBasicDataRepository.create(createProcessDto);
            return createdProcess;
        }
        catch (error) {
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
    async getProcessBasicDataById(id) {
        return this.processBasicDataRepository.findById(id);
    }
    async updateProcessBasicData(id, data) {
        const updateResponse = await this.processBasicDataRepository.update({ _id: id }, data);
        return updateResponse;
    }
    async deleteProcessBasicData(id) {
        return this.processBasicDataRepository.delete(id);
    }
    async softDeleteProcessBasicData(id) {
        return this.processBasicDataRepository.softDelete(id);
    }
};
exports.ProcessBasicDataService = ProcessBasicDataService;
exports.ProcessBasicDataService = ProcessBasicDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [process_basic_data_repository_1.ProcessBasicDataRepository])
], ProcessBasicDataService);
//# sourceMappingURL=process.basic.data.service.js.map