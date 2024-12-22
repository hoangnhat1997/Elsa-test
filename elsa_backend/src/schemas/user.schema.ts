import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  quizId: string;

  @Prop({ default: 0 })
  score: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
