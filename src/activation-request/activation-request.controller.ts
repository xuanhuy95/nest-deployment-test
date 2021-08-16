import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivationRequestService } from './activation-request.service';
import { CreateActivationRequestDto } from './dto/create-activation-request.dto';
import { UpdateActivationRequestDto } from './dto/update-activation-request.dto';

@Controller('activation-request')
export class ActivationRequestController {
  constructor(private readonly activationRequestService: ActivationRequestService) {}

  @Post()
  create(@Body() createActivationRequestDto: CreateActivationRequestDto) {
    return this.activationRequestService.create(createActivationRequestDto);
  }

  @Get()
  findAll() {
    return this.activationRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activationRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivationRequestDto: UpdateActivationRequestDto) {
    return this.activationRequestService.update(+id, updateActivationRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activationRequestService.remove(+id);
  }
}
