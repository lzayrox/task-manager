import { TaskModel } from '@prisma/client';
import { Task } from '../../domain/entities/task.entity';

export class PostgresTaskMapper {
    static toDomain(model: TaskModel): Task {
        return new Task(
            model.id,
            model.title,
            model.isCompleted
        );
    }

    static toPersistence(entity: Task) {
        return {
            id: entity.id,
            title: entity.title,
            isCompleted: entity.isCompleted,
        };
    }
}