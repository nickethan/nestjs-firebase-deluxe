"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap_task = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_task_module_1 = require("./app-task.module");
const app_task_service_1 = require("./app-task.service");
let apptask;
const env = process.env.NODE_ENV;
const log_levels = (env === 'development') ? ['debug', 'error', 'log', 'verbose', 'warn'] : ['error', 'warn'];
async function startTaskApplication() {
    if (!apptask) {
        apptask = await core_1.NestFactory.create(app_task_module_1.AppTaskModule, { logger: log_levels });
    }
    return apptask;
}
async function bootstrap_task(next, params = {}) {
    try {
        const instance = await startTaskApplication();
        const service = await instance.resolve(app_task_service_1.AppTaskService);
        await next(service, params);
        await apptask.close();
        return;
    }
    catch (err) {
        throw new common_1.InternalServerErrorException(err);
    }
}
exports.bootstrap_task = bootstrap_task;
exports.default = { bootstrap_task };
//# sourceMappingURL=main.js.map