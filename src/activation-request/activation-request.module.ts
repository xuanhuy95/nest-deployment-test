import { Module } from '@nestjs/common';
import { ActivationRequestService } from './activation-request.service';
import { ActivationRequestController } from './activation-request.controller';

@Module({
  controllers: [ActivationRequestController],
  providers: [ActivationRequestService]
})
export class ActivationRequestModule {}
