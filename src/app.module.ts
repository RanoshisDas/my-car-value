import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportesModule } from './reportes/reportes.module';
import {User} from "./users/user.entity";
import {Report} from "./reportes/report.entity";

@Module({
  imports: [UsersModule, ReportesModule, TypeOrmModule.forRoot({
      type:'sqlite',
      database:'db.sqlite3',
      entities:[User,Report],
      synchronize:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
