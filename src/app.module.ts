import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { ActivationRequestModule } from './activation-request/activation-request.module';

@Module({
  imports: [TicketModule, ActivationRequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
