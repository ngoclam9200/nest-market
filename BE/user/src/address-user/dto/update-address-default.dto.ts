import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UpdateAddressDefaultDto {

  @ApiProperty()
  @IsInt()
  id : number;

}