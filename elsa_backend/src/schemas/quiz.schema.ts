import { Schema, Document } from 'mongoose';

export const QuizSchema = new Schema({
  question: String,
  options: [String],
  correctAnswer: Number,
});

export interface Quiz extends Document {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
