import {Body, Controller, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";
import {ReportesService} from "./reportes.service";
import {AuthGuard} from "../guards/auth.guard";
import {CurrentUser} from "../users/decorators/current-user.decorator";
import {User} from "../users/user.entity";
import {Serialize} from "../interceptors/serialize.interceptor";
import {ReportDto} from "./dtos/report.dto";
import {ApproveReportDto} from "./dtos/approve-report.dto";
import {AdminGuard} from "../guards/admin.guard";
import {GetEstimateDto} from "./dtos/get-estimate.dto";

@Controller('reportes')
@UseGuards(AuthGuard)
export class ReportesController {
    constructor(private reportesService:ReportesService) {}

    @Post()
    @Serialize(ReportDto)
    createReport(@Body()body: CreateReportDto,@CurrentUser()user:User) {
        return this.reportesService.createReport(body,user);
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    approveReport(@Param('id') id:string, @Body() body:ApproveReportDto) {
            return this.reportesService.approveReport(parseInt(id),body.approved);
    }

    @Get()
    getEstimate(@Query()query:GetEstimateDto){
        return this.reportesService.createEstimate(query);
    }


}
