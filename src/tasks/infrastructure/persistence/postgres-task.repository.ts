import { Injectable } from '@nestjs/common';
import { TaskModel } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { Task } from '../../domain/entities/task.entity';
import { ITaskRepository } from '../../domain/repositories/task.repository';
import { PostgresTaskMapper } from '../mappers/postgres-task.mapper';

@Injectable()
export class PostgresTaskRepository implements ITaskRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(task: Task): Promise<void> {
        const data = PostgresTaskMapper.toPersistence(task);

        await this.prisma.taskModel.upsert({
            where: { id: task.id },
            update: data,
            create: data,
        });
    }

    async findAll(): Promise<Task[]> {
        const models = await this.prisma.taskModel.findMany();
        return models.map((model: TaskModel) => PostgresTaskMapper.toDomain(model));
    }

    async findById(id: string): Promise<Task | null> {
        const model = await this.prisma.taskModel.findUnique({ where: { id } });
        return model ? PostgresTaskMapper.toDomain(model) : null;
    }
}