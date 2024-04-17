import { NestFactory } from '@nestjs/core';
import { INestApplication, InternalServerErrorException, LogLevel } from '@nestjs/common';

import { AppTaskModule } from './app-task.module';
import { AppTaskService } from './app-task.service';

let apptask: INestApplication;
const env = process.env.NODE_ENV;
const log_levels: LogLevel[] = (env === 'development') ? ['debug', 'error', 'log', 'verbose', 'warn'] : ['error', 'warn'];

async function startTaskApplication(): Promise<INestApplication> {
  if (!apptask) {
    apptask = await NestFactory.create(AppTaskModule, { logger: log_levels });
  }
  return apptask;
}

export async function bootstrap_task(next: Function, params: object = {}) {
  try { 
    const instance = await startTaskApplication();
    const service = await instance.resolve<AppTaskService>(AppTaskService);
    await next(service, params);
    await apptask.close();
    return;
  } catch(err) {
    throw new InternalServerErrorException(err);
  }
}

export default { bootstrap_task }
