import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.userModel.upsert({
        where: { email: 'admin@test.com' },
        update: {},
        create: {
            email: 'admin@test.com',
            passwordHash: await bcrypt.hash('admin123', 10),
            role: 'ADMIN',
        },
    });
}

main().finally(() => prisma.$disconnect());