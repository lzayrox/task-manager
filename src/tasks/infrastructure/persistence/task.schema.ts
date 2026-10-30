import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'tasks', versionKey: false })
export class TaskDocument {
  // Guardamos el UUID de la Entidad como _id (string, no ObjectId)
  @Prop({ type: String })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  isCompleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);