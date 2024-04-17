"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap_db = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_db_module_1 = require("./app-db.module");
const app_db_service_1 = require("./app-db.service");
let apptask;
const env = process.env.NODE_ENV;
const log_levels = (env === 'development') ? ['debug', 'error', 'log', 'verbose', 'warn'] : ['error', 'warn'];
async function startDBApplication() {
    if (!apptask) {
        apptask = await core_1.NestFactory.create(app_db_module_1.AppDBModule, { logger: log_levels });
    }
    return apptask;
}
async function bootstrap_db(next, params = {}) {
    try {
        const instance = await startDBApplication();
        const service = await instance.resolve(app_db_service_1.AppDBService);
        await next(service, params);
        await apptask.close();
        return;
    }
    catch (err) {
        throw new common_1.InternalServerErrorException(err);
    }
}
exports.bootstrap_db = bootstrap_db;
exports.default = { bootstrap_db };
//# sourceMappingURL=main.js.map