import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteAddressDto {

  @ApiProperty()
  @IsInt()
  id : number;

  @ApiProperty()
  @IsInt()
  id_address_default : number;

}