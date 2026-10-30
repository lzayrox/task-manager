import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../../domain/entities/task.entity';
import { ITaskRepository } from '../../domain/repositories/task.repository';
import { MongoTaskMapper } from '../mappers/mongo-task.mapper';
import { TaskDocument } from './task.schema';

@Injectable()
export class MongoTaskRepository implements ITaskRepository {
    constructor(
        @InjectModel(TaskDocument.name)
        private readonly model: Model<TaskDocument>,
    ) { }

    async save(task: Task): Promise<void> {
        const data = MongoTaskMapper.toPersistence(task);
        await this.model.updateOne({ _id: data._id }, data, { upsert: true });
    }

    async findAll(): Promise<Task[]> {
        const docs = await this.model.find().lean();
        return docs.map((doc) => MongoTaskMapper.toDomain(doc));
    }

    async findById(id: string): Promise<Task | null> {
        const doc = await this.model.findById(id).lean();
        return doc ? MongoTaskMapper.toDomain(doc) : null;
    }
}