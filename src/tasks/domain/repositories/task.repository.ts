import { Task } from '../entities/task.entity';

export interface ITaskRepository {
    save(task: Task): Promise<void>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
}