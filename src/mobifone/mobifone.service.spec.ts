import { Test, TestingModule } from '@nestjs/testing';
import { MobifoneService } from './mobifone.service';

describe('MobifoneService', () => {
  let service: MobifoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MobifoneService],
    }).compile();

    service = module.get<MobifoneService>(MobifoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
