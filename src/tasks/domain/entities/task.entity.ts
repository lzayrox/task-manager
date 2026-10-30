import { InvalidTaskTitleError } from '../errors/invalid-task-title.error';

export class Task {
    constructor(
        public readonly id: string,
        public title: string,
        public isCompleted: boolean = false
    ) {
        // Regla de negocio: Validamos antes de que nada exista
        if (!title || title.trim().length < 3) {
            throw new InvalidTaskTitleError();
        }
    }

    complete(): void {
        this.isCompleted = true;
    }

    toggleCompleted(): void {
        this.isCompleted = !this.isCompleted;
    }
}