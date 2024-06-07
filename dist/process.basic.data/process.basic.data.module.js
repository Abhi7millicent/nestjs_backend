"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessBasicDataModule = void 0;
const common_1 = require("@nestjs/common");
const process_basic_data_service_1 = require("./process.basic.data.service");
const process_basic_data_controller_1 = require("./process.basic.data.controller");
const mongoose_1 = require("@nestjs/mongoose");
const process_basic_data_schema_1 = require("./process.basic.data.schema");
const process_basic_data_repository_1 = require("./process.basic.data.repository");
const process_basic_data_activity_service_1 = require("./process.basic.data.activity.service");
const process_basic_data_workflow_service_1 = require("./process.basic.data.workflow.service");
let ProcessBasicDataModule = class ProcessBasicDataModule {
};
exports.ProcessBasicDataModule = ProcessBasicDataModule;
exports.ProcessBasicDataModule = ProcessBasicDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: process_basic_data_schema_1.ProcessBasicData.name, schema: process_basic_data_schema_1.ProcessBasicDataSchema }
            ])
        ],
        providers: [process_basic_data_service_1.ProcessBasicDataService, process_basic_data_repository_1.ProcessBasicDataRepository, process_basic_data_activity_service_1.ProcessActivityService, process_basic_data_workflow_service_1.ProcessWorkflowService],
        controllers: [process_basic_data_controller_1.ProcessBasicDataController]
    })
], ProcessBasicDataModule);
//# sourceMappingURL=process.basic.data.module.js.map