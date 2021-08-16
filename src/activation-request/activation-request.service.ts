import { Injectable } from '@nestjs/common';
import { CreateActivationRequestDto } from './dto/create-activation-request.dto';
import { UpdateActivationRequestDto } from './dto/update-activation-request.dto';

@Injectable()
export class ActivationRequestService {
  create(createActivationRequestDto: CreateActivationRequestDto) {
    return 'This action adds a new activationRequest';
  }

  findAll() {
    return `This action returns all activationRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activationRequest`;
  }

  update(id: number, updateActivationRequestDto: UpdateActivationRequestDto) {
    return `This action updates a #${id} activationRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} activationRequest`;
  }
}
