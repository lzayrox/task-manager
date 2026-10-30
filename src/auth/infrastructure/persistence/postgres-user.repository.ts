import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { Role } from '../../domain/enums/role.enum';
import { IUserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class PostgresUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string): Promise<User | null> {
        const model = await this.prisma.userModel.findUnique({
            where: { email },
        });

        if (!model) {
            return null;
        }

        return new User(
            model.id,
            model.email,
            model.passwordHash,
            Role[model.role], // enum de Prisma → enum del Dominio
        );
    }
}