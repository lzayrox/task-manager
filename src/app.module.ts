import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }), // carga el archivo .env
		PrismaModule,
		TasksModule,
	],
})
export class AppModule { }