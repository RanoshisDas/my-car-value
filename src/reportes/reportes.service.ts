import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Report} from "./report.entity";
import {CreateReportDto} from "./dtos/create-report.dto";
import {User} from "../users/user.entity";
import {GetEstimateDto} from "./dtos/get-estimate.dto";

@Injectable()
export class ReportesService {
    constructor(@InjectRepository(Report)
                private repo: Repository<Report>){}


    createReport(report:CreateReportDto,user:User){
        const newReport=this.repo.create(report);
        newReport.user=user;
        return this.repo.save(newReport);

    }

    async approveReport(id:number,approve:boolean){

        const report=await this.repo.findOneBy({id});
        if(!report){
            throw new NotFoundException('Report not found');
        }
        report.approved=approve;
        return this.repo.save(report);
    }

    createEstimate({make,model,lat,lng,mileage,year}:GetEstimateDto){
        return this.repo.createQueryBuilder()
            .select('Avg(price)', 'price')
            .where('make = :make', { make })
            .andWhere('approved IS TRUE')
            .andWhere('model = :model', { model })
            .andWhere('lng - :lng BETWEEN -5 AND 5', {lng})
            .andWhere('lat - :lat BETWEEN -5 AND 5', {lat})
            .andWhere('year - :year BETWEEN -3 AND 3', {year})
            .orderBy('ABS(mileage - :mileage)', 'ASC')
            .setParameters({ mileage })
            .limit(3)
            .getRawOne();
    }

    getCarData(year:number){
        return this.repo.createQueryBuilder()
            .select('*')
            .where('year < :year',{year})
            .andWhere('approved IS TRUE')
            .limit(5)
            .getRawMany();
    }
}
