"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppApiModule = void 0;
const common_1 = require("@nestjs/common");
const app_api_controller_1 = require("./app-api.controller");
const app_api_service_1 = require("./app-api.service");
let AppApiModule = class AppApiModule {
};
AppApiModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_api_controller_1.AppApiController],
        providers: [app_api_service_1.AppApiService],
    })
], AppApiModule);
exports.AppApiModule = AppApiModule;
//# sourceMappingURL=app-api.module.js.map