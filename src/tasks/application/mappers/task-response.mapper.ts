import { Task } from '../../domain/entities/task.entity';
import { TaskResponseDto } from '../dto/task-response.dto';

export class TaskResponseMapper {
    static toDto(task: Task): TaskResponseDto {
        return {
            id: task.id,
            title: task.title,
            isCompleted: task.isCompleted,
        };
    }
}