import { Schema, Document } from 'mongoose';

export const QuestionSchema = new Schema({
  question: String,
  options: [String],
  correctAnswer: Number,
});

export interface Question extends Document {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
