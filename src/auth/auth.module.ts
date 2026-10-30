import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { PASSWORD_HASHER, TOKEN_SERVICE, USER_REPOSITORY } from './application/tokens';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from './infrastructure/guards/roles.guard';
import { PostgresUserRepository } from './infrastructure/persistence/postgres-user.repository';
import { BcryptPasswordHasher } from './infrastructure/security/bcrypt-password-hasher';
import { JwtTokenService } from './infrastructure/security/jwt-token.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow<string>('JWT_SECRET'), // desde .env
                signOptions: { expiresIn: '1h' },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [
        { provide: USER_REPOSITORY, useClass: PostgresUserRepository },
        { provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher },
        { provide: TOKEN_SERVICE, useClass: JwtTokenService },
        LoginUseCase,
        JwtAuthGuard,
        RolesGuard,
    ],
    // Exportamos lo que otros módulos necesitan para usar los guards
    exports: [JwtModule, JwtAuthGuard, RolesGuard],
})
export class AuthModule { }