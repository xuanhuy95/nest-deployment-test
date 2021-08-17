import { Test, TestingModule } from '@nestjs/testing';
import { VietguysService } from './vietguys.service';

describe('VietguysService', () => {
  let service: VietguysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VietguysService],
    }).compile();

    service = module.get<VietguysService>(VietguysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
