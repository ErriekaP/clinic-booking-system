import { PartialType } from '@nestjs/mapped-types';
import { CreateVitalSignDto } from './create-vital-sign.dto';

export class UpdateVitalSignDto extends PartialType(CreateVitalSignDto) {}
