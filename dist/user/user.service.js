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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const encryption_1 = require("../utils/encryption");
let UserService = class UserService {
    constructor(userRepository, encryption) {
        this.userRepository = userRepository;
        this.encryption = encryption;
    }
    async getUsers() {
        return await this.userRepository.findAll();
    }
    async getUserById(id) {
        return await this.userRepository.findById(id);
    }
    async createUser(createUserDto) {
        const encryptedPassword = await this.encryption.encryptData(createUserDto.password);
        const user = { ...createUserDto, password: encryptedPassword };
        return await this.userRepository.create(user);
    }
    async updateUser(id, updateUserDto) {
        return await this.userRepository.update({ _id: id }, { $set: updateUserDto });
    }
    async deleteUser(id) {
        return await this.userRepository.delete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        encryption_1.Encryption])
], UserService);
//# sourceMappingURL=user.service.js.map