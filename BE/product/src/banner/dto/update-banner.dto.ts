import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBannerDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty({ message: 'Id không được để trống' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsInt()
  media_id: number;

  @ApiProperty()
  title: string;
}
