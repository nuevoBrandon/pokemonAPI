import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SeedService } from './seed.service';



@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
  ) {}

  @Get()
  executeSeed(
    @Query('size') size:string
  ) {
    return this.seedService.execute(size);
  }


}
