import { NestFactory } from '@nestjs/core';
import { INestApplication, InternalServerErrorException, LogLevel } from '@nestjs/common';

import { AppDBModule } from './app-db.module';
import { AppDBService } from './app-db.service';

let apptask: INestApplication;
const env = process.env.NODE_ENV;
const log_levels: LogLevel[] = (env === 'development') ? ['debug', 'error', 'log', 'verbose', 'warn'] : ['error', 'warn'];

async function startDBApplication(): Promise<INestApplication> {
  if (!apptask) {
    apptask = await NestFactory.create(AppDBModule, { logger: log_levels });
  }
  return apptask;
}

export async function bootstrap_db(next: Function, params: object = {}) {
  try { 
    const instance = await startDBApplication();
    const service = await instance.resolve<AppDBService>(AppDBService);
    await next(service, params);
    await apptask.close();
    return;
  } catch(err) {
    throw new InternalServerErrorException(err);
  }
}

export default { bootstrap_db }
