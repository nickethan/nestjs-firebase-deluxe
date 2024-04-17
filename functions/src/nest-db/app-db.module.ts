import { Module } from '@nestjs/common';
import { AppDBController } from './app-db.controller';
import { AppDBService } from './app-db.service';

@Module({
  imports: [],
  controllers: [AppDBController],
  providers: [AppDBService],
})
export class AppDBModule {}
