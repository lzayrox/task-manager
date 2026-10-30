import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { Task } from '../../domain/entities/task.entity';
import type { ITaskRepository } from '../../domain/repositories/task.repository';

import { TASK_REPOSITORY } from '../tokens';
import { TaskResponseDto } from '../dto/task-response.dto';
import { TaskResponseMapper } from '../mappers/task-response.mapper';

@Injectable()
export class CreateTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY) private readonly taskRepo: ITaskRepository,
    ) { }

    async execute(title: string): Promise<TaskResponseDto> {
        const task = new Task(randomUUID(), title);

        await this.taskRepo.save(task);

        return TaskResponseMapper.toDto(task);
    }
}