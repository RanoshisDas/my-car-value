import {MiddlewareConsumer, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportesModule } from './reportes/reportes.module';
import {ConfigModule,ConfigService} from "@nestjs/config";
import cookieSession from "cookie-session";
import {dbConfig} from '../ormconfig';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`
          // envFilePath: `.env.development`
      }),
      UsersModule,
      ReportesModule,
      TypeOrmModule.forRoot(dbConfig),

      // TypeOrmModule.forRootAsync({
      //     inject:[ConfigService],
      //     useFactory:(config: ConfigService)=>{
      //         return {
      //             type:'sqlite',
      //             database:config.get<string>('DB_NAME'),
      //             synchronize:true,
      //             entities:[User,Report]
      //         };
      // },
      // })
  //     TypeOrmModule.forRoot({
  //     type:'sqlite',
  //     database:'db.sqlite3',
  //     entities:[User,Report],
  //     synchronize:true
  // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(private configService: ConfigService){}
    configure(consumer:MiddlewareConsumer){
        consumer.apply(
            cookieSession({
                keys:[this.configService.get('COOKIE_KEY','')],
            }),
        ).forRoutes('*');
    }
}
