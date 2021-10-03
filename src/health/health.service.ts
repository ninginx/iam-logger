import { Injectable } from '@nestjs/common';
import { HealthUsecase } from './core/usecase/health.usecase';
import { HealthDatastore, Twitter } from './infra';

@Injectable()
export class HealthService {
  private healthUsecase: HealthUsecase;
  constructor() {
    this.healthUsecase = new HealthUsecase(
      new HealthDatastore(),
      new Twitter(),
    );
  }

  report = async (myWeight: number, myBfp: number): Promise<void> =>
    await this.healthUsecase.recordHealth(myBfp, myWeight);
}
