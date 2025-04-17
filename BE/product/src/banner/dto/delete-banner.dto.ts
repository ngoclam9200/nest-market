



import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class DeleteBannerDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Id không được để trống' })
    @IsInt()
    id: number;
}

