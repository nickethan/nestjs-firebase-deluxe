import { NestFactory } from '@nestjs/core';
import { INestApplication, InternalServerErrorException, LogLevel } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';

import * as express from 'express';

import { AppApiModule } from './app-api.module';

let appApi: INestApplication;
const expressServer: express.Application = express();

const env = process.env.NODE_ENV;
const log_levels: LogLevel[] = (env === 'development') ? ['debug', 'error', 'log', 'verbose', 'warn'] : ['error', 'warn'];

async function startApiApplication(expressInstance: express.Application): Promise<INestApplication> {
  if (!appApi) {
    appApi = await NestFactory.create(
      AppApiModule,
      new ExpressAdapter(expressInstance), 
      {
        logger: log_levels,
      }
    );

    appApi.enableCors();
    
    await appApi.init();
  }
  return appApi;
}

export const bootstrap_api = async (req: express.Request, res: express.Response) => {
  try {
    await startApiApplication(expressServer);
    expressServer(req, res);
  } catch(err) {
    throw new InternalServerErrorException(err);
  }
}

export default { bootstrap_api }
