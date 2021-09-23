import { Body, Controller, Get, Post } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  getHello(): string {
    return 'aaa';
  }

  @Post()
  reportHealth(@Body() myHealth: { weight: number; bfp: number }) {
    return this.healthService.report(myHealth.weight, myHealth.bfp);
  }
}
