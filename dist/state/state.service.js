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
exports.StateService = void 0;
const common_1 = require("@nestjs/common");
const state_repository_1 = require("./state.repository");
let StateService = class StateService {
    constructor(stateRepository) {
        this.stateRepository = stateRepository;
    }
    async createState(state) {
        return this.stateRepository.create(state);
    }
    async getAllStates() {
        return this.stateRepository.findAll();
    }
    async getStatesByCountryId(countryId) {
        try {
            const states = await this.stateRepository.findAll({ country: countryId });
            return states;
        }
        catch (error) {
            console.error("Error fetching states by country ID:", error);
            throw new common_1.InternalServerErrorException('Failed to get states by country ID');
        }
    }
    async getStateById(id) {
        return this.stateRepository.findById(id);
    }
    async updateState(id, state) {
        return this.stateRepository.update1(id, state);
    }
    async deleteState(id) {
        return this.stateRepository.delete(id);
    }
};
exports.StateService = StateService;
exports.StateService = StateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [state_repository_1.StateRepository])
], StateService);
//# sourceMappingURL=state.service.js.map