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
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const citry_repository_1 = require("./citry.repository");
let CityService = class CityService {
    constructor(cityRepository) {
        this.cityRepository = cityRepository;
    }
    async createCity(city) {
        return this.cityRepository.create(city);
    }
    async getAllCities() {
        return this.cityRepository.findAll();
    }
    async getstateByCity(name) {
        const city = await this.cityRepository.findOneOrFailParam({ name: name }, 'name', [{ path: 'state', populate: 'country' }]);
        return city;
    }
    async getCityById(id) {
        return this.cityRepository.findById(id);
    }
    async updateCity(id, city) {
        return this.cityRepository.update1(id, city);
    }
    async deleteCity(id) {
        return this.cityRepository.delete(id);
    }
    async getCitiesWithLimit(stateId) {
        try {
            return await this.cityRepository.findAllWithLimit({ state: stateId }, 3);
        }
        catch (error) {
            console.error("Error fetching cities with limit:", error);
            throw new common_1.InternalServerErrorException('Failed to get cities with limit');
        }
    }
    async getCitiesWithSkip(stateId) {
        try {
            return await this.cityRepository.findAllWithSkip({ state: stateId }, 4);
        }
        catch (error) {
            console.error("Error fetching cities with skip:", error);
            throw new common_1.InternalServerErrorException('Failed to get cities with skip');
        }
    }
    async getCitiesWithSelect(stateId) {
        try {
            return await this.cityRepository.findAllWithSelect({ state: stateId }, 'name');
        }
        catch (error) {
            console.error("Error fetching cities with select:", error);
            throw new common_1.InternalServerErrorException('Failed to get cities with select');
        }
    }
    async getCitiesWithPopulate(stateId) {
        try {
            const populateOption = [{ path: 'state', populate: 'country' }];
            return await this.cityRepository.findAllWithPopulate({ state: stateId }, populateOption);
        }
        catch (error) {
            console.error("Error fetching cities with populate:", error);
            throw new common_1.InternalServerErrorException('Failed to get cities with populate');
        }
    }
    async getCitiesAscendingByName(stateId) {
        try {
            return await this.cityRepository.findAllAscending('name', { state: stateId });
        }
        catch (error) {
            console.error("Error fetching cities in ascending order by name:", error);
            throw new common_1.InternalServerErrorException('Failed to get cities in ascending order by name');
        }
    }
    async getCitiesDescendingByName(stateId) {
        try {
            return await this.cityRepository.findAllDescending('name', { state: stateId });
        }
        catch (error) {
            console.error("Error fetching cities in descending order by name:", error);
            throw new common_1.InternalServerErrorException('Failed to get cities in descending order by name');
        }
    }
    async getCitiesByStateId(stateId) {
        try {
            const criteria = { state: stateId };
            const sort = { name: 1 };
            const limit = 1;
            const select = 'name';
            const populate = [{ path: 'state', populate: 'country' }];
            const cities = await this.cityRepository.findAllParam(criteria, sort, limit, select, undefined, populate);
            return cities;
        }
        catch (error) {
            console.error("Error fetching cities by state ID:", error);
            throw new common_1.InternalServerErrorException('Failed to get cities by state ID');
        }
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [citry_repository_1.CityRepository])
], CityService);
//# sourceMappingURL=city.service.js.map