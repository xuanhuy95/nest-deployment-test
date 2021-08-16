import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    throw Error('hello');
    return this.appService.getHello();
  }
  @Get('hello-2')
  getHello2(): string {
    return this.configService.get('DATABASE_USER');
  }
}
