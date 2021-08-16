import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { ActivationRequestModule } from './activation-request/activation-request.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
      TicketModule,
      ActivationRequestModule,
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: '127.0.0.1',
          port: 3366,
          username: 'root',
          password: 'matkhau12345',
          database: 'mylocaltest',
          entities: [],
          synchronize: true,
      }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
