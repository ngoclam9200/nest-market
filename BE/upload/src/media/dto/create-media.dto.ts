import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateMediaDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Type không được để trống' })
    type: number;

}
