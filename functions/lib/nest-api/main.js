"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap_api = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const app_api_module_1 = require("./app-api.module");
let appApi;
const expressServer = express();
const env = process.env.NODE_ENV;
const log_levels = (env === 'development') ? ['debug', 'error', 'log', 'verbose', 'warn'] : ['error', 'warn'];
async function startApiApplication(expressInstance) {
    if (!appApi) {
        appApi = await core_1.NestFactory.create(app_api_module_1.AppApiModule, new platform_express_1.ExpressAdapter(expressInstance), {
            logger: log_levels,
        });
        appApi.enableCors();
        await appApi.init();
    }
    return appApi;
}
const bootstrap_api = async (req, res) => {
    try {
        await startApiApplication(expressServer);
        expressServer(req, res);
    }
    catch (err) {
        throw new common_1.InternalServerErrorException(err);
    }
};
exports.bootstrap_api = bootstrap_api;
exports.default = { bootstrap_api: exports.bootstrap_api };
//# sourceMappingURL=main.js.map