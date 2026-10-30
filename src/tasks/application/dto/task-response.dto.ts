import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    isCompleted: boolean;
}