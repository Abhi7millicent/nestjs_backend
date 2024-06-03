"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const authentication_controller_1 = require("./authentication.controller");
const authentication_service_1 = require("./authentication.service");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../user/user.schema");
const authentication_repository_1 = require("./authentication.repository");
const jwt_auth_guard_1 = require("./guards/jwt.auth.guard");
let AthenticationModule = class AthenticationModule {
};
exports.AthenticationModule = AthenticationModule;
exports.AthenticationModule = AthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            jwt_1.JwtModule.register({
                secret: 'your_secret_key',
                signOptions: { expiresIn: '1d' },
            }),
        ],
        controllers: [authentication_controller_1.AuthenticationController],
        providers: [authentication_service_1.AuthenticationService, authentication_repository_1.AuthenticationRepository, jwt_auth_guard_1.JwtAuthGuard],
        exports: [jwt_auth_guard_1.JwtAuthGuard, jwt_1.JwtModule],
    })
], AthenticationModule);
//# sourceMappingURL=authentication.module.js.map