import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  async getHello(): Promise<{ weight: number; bfp: number }> {
    return Promise.resolve({ weight: 10, bfp: 20 });
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post()
  reportHealth(
    @Body() myHealth: { weight: number; bfp: number },
  ): Promise<void> {
    return this.healthService.report(
      Number(myHealth.weight),
      Number(myHealth.bfp),
    ).catch((e)=> {throw new HttpException(e.message, HttpStatus.FORBIDDEN)});
  }
}
