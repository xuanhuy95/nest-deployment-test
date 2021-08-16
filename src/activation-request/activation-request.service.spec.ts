import { Test, TestingModule } from '@nestjs/testing';
import { ActivationRequestService } from './activation-request.service';

describe('ActivationRequestService', () => {
  let service: ActivationRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivationRequestService],
    }).compile();

    service = module.get<ActivationRequestService>(ActivationRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
