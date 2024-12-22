import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Quiz extends Document {
  @Prop({ required: true })
  quizId: string;

  @Prop({ required: true })
  creatorNickname: string;

  @Prop({ type: [String], default: [] })
  userNicknames: string[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
