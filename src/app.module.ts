import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { ActivationRequestModule } from './activation-request/activation-request.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobifoneService } from './mobifone/mobifone.service';
import { VietguysService } from './vietguys/vietguys.service';
@Module({
  imports: [
      TicketModule,
      ActivationRequestModule,
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [],
          synchronize: false,
      }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
