import { Schema, Document } from 'mongoose';

export const ScoreSchema = new Schema({
  userId: String,
  score: Number,
});

export interface Score extends Document {
  userId: string;
  score: number;
}
