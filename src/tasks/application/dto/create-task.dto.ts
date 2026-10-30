import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    title: string;
}