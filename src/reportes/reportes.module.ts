import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesController } from './reportes.controller';
import {Report} from "./report.entity";
import { ReportesService } from './reportes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportesController],
  providers: [ReportesService]
})
export class ReportesModule {

}
