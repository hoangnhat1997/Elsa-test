import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from 'src/schemas/quiz.schema';

@Injectable()
export class QuizService {
  constructor(@InjectModel('Quiz') private readonly quizModel: Model<Quiz>) {}

  async createQuiz(quiz: Quiz): Promise<Quiz> {
    const newQuiz = new this.quizModel(quiz);
    return newQuiz.save();
  }

  async getQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  // Add more methods as needed
}
