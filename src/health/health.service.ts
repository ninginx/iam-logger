import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { HealthUsecase } from './core/usecase/health.usecase';
import { HealthDatastore } from './infra';

@Injectable()
export class HealthService {
  private healthUsecase: HealthUsecase;
  constructor() {
    this.healthUsecase = new HealthUsecase(new HealthDatastore());
  }

  report = async (myWeight: number, myBfp: number): Promise<string> =>
    await this.healthUsecase.recordHealth(myWeight, myBfp);
}
