import { Task } from '../../domain/entities/task.entity';
import { TaskDocument } from '../persistence/task.schema';

export class MongoTaskMapper {
    static toDomain(doc: TaskDocument): Task {
        return new Task(
            doc._id, // Traducción técnica: _id → id
            doc.title,
            doc.isCompleted
        );
    }

    static toPersistence(task: Task): TaskDocument {
        return { _id: task.id, title: task.title, isCompleted: task.isCompleted };
    }
}