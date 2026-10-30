import { Module, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { TASK_REPOSITORY } from './application/tokens';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { TaskController } from './infrastructure/controllers/task.controller';
import { ITaskRepository } from './domain/repositories/task.repository';
import { PostgresTaskRepository } from './infrastructure/persistence/postgres-task.repository';
import { MongoTaskRepository } from './infrastructure/persistence/mongo-task.repository';
import { TaskDocument, TaskSchema } from './infrastructure/persistence/task.schema';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.getOrThrow<string>('MONGO_URL'),
            }),
        }),
        MongooseModule.forFeature([{ name: TaskDocument.name, schema: TaskSchema }]),
    ],
    controllers: [TaskController],
    providers: [
        // 1. Registras ambos repositorios como providers para que Nest resuelva sus dependencias internas
        PostgresTaskRepository,
        MongoTaskRepository,

        // 2. Factory dinámico con el Map
        {
            provide: TASK_REPOSITORY,
            inject: [ConfigService, PostgresTaskRepository, MongoTaskRepository],
            useFactory: (
                config: ConfigService,
                postgresRepo: PostgresTaskRepository,
                mongoRepo: MongoTaskRepository,
            ) => {
                const driver = config.get<string>('DB_DRIVER', 'postgres').toLowerCase();

                const repositoryMap = new Map<string, ITaskRepository>([
                    ['postgres', postgresRepo],
                    ['mongo', mongoRepo],
                ]);

                const selectedRepo = repositoryMap.get(driver);

                if (!selectedRepo) {
                    throw new Error(
                        `Driver de base de datos no soportado: "${driver}". Usa "postgres" o "mongo".`,
                    );
                }

                Logger.log(`Usando repositorio activo: ${driver.toUpperCase()}`);

                return selectedRepo;
            },
        },
        CreateTaskUseCase,
    ],
})
export class TasksModule { }