import { Test, TestingModule } from '@nestjs/testing';
import { ActivationRequestController } from './activation-request.controller';
import { ActivationRequestService } from './activation-request.service';

describe('ActivationRequestController', () => {
  let controller: ActivationRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivationRequestController],
      providers: [ActivationRequestService],
    }).compile();

    controller = module.get<ActivationRequestController>(ActivationRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
