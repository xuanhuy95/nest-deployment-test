import { PartialType } from '@nestjs/mapped-types';
import { CreateActivationRequestDto } from './create-activation-request.dto';

export class UpdateActivationRequestDto extends PartialType(CreateActivationRequestDto) {}
