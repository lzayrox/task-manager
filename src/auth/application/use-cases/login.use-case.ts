import { Inject, Injectable } from '@nestjs/common';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials.error';
import type { IUserRepository } from '../../domain/repositories/user.repository';
import type { IPasswordHasher } from '../ports/password-hasher.port';
import type { ITokenService } from '../ports/token-service.port';
import { PASSWORD_HASHER, TOKEN_SERVICE, USER_REPOSITORY } from '../tokens';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
        @Inject(PASSWORD_HASHER) private readonly hasher: IPasswordHasher,
        @Inject(TOKEN_SERVICE) private readonly tokens: ITokenService,
    ) { }

    async execute(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.users.findByEmail(email);
        if (!user) {
            throw new InvalidCredentialsError();
        }

        const valid = await this.hasher.compare(password, user.passwordHash);
        if (!valid) {
            throw new InvalidCredentialsError();
        }

        const access_token = await this.tokens.sign({ sub: user.id, role: user.role });
        return { access_token };
    }
}