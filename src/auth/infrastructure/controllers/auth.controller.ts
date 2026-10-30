import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../application/dto/login.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials.error';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() dto: LoginDto) {
        try {
            return await this.loginUseCase.execute(dto.email, dto.password);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                throw new UnauthorizedException(error.message); // Dominio → HTTP 401
            }
            throw error;
        }
    }
}