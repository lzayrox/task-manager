import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../../../auth/domain/enums/role.enum';
import { Roles } from '../../../auth/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/infrastructure/guards/roles.guard';
import { CreateTaskDto } from '../../application/dto/create-task.dto';
import { TaskResponseDto } from '../../application/dto/task-response.dto';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { InvalidTaskTitleError } from '../../domain/errors/invalid-task-title.error';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TaskController {
    constructor(private readonly createTaskUseCase: CreateTaskUseCase) { }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva tarea' })
    @ApiCreatedResponse({ type: TaskResponseDto })
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() dto: CreateTaskDto): Promise<TaskResponseDto> {
        try {
            return await this.createTaskUseCase.execute(dto.title);
        } catch (error) {
            if (error instanceof InvalidTaskTitleError) {
                throw new BadRequestException(error.message);
            }
            throw error;
        }
    }
}