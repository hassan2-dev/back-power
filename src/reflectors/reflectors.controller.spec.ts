import { Test, TestingModule } from '@nestjs/testing';
import { ReflectorsController } from './reflectors.controller';
import { ReflectorsService } from './reflectors.service';

describe('ReflectorsController', () => {
  let controller: ReflectorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReflectorsController],
      providers: [ReflectorsService],
    }).compile();

    controller = module.get<ReflectorsController>(ReflectorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
