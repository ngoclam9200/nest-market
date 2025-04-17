import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  media_id: number;

  @ApiProperty()
  title: string;
  
}
