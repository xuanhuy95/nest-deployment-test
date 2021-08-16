import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { ActivationRequestModule } from './activation-request/activation-request.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [TicketModule, ActivationRequestModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
