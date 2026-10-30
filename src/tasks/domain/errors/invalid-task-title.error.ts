export class InvalidTaskTitleError extends Error {
    constructor() {
        super('El título debe tener al menos 3 caracteres');
    }
}