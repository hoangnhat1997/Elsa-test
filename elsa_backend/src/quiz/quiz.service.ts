// src/quiz/quiz.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from '../schemas/quiz.schema';
import { User } from '../schemas/user.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { JoinQuizDto } from './dto/join-quiz.dto';
import { Question } from 'src/schemas/question.schema';
import { Score } from 'src/schemas/score.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel('Question') private readonly questionModel: Model<Question>,
    @InjectModel('Score') private readonly scoreModel: Model<Score>,
    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = new this.quizModel({
      quizId: Math.random().toString(36).substring(2, 15),
      creatorNickname: createQuizDto.creatorNickname,
      userNicknames: [createQuizDto.creatorNickname],
    });
    return quiz.save();
  }

  async joinQuiz(quizId: string, joinQuizDto: JoinQuizDto): Promise<User> {
    const user = new this.userModel({
      nickname: joinQuizDto.nickname,
      quizId: quizId,
    });
    await user.save();
    await this.quizModel.updateOne(
      { quizId },
      { $push: { userNicknames: joinQuizDto.nickname } },
    );

    return user;
  }

  async submitAnswer(
    userId: string,
    questionId: string,
    answer: number,
  ): Promise<boolean> {
    const question = await this.questionModel.findById(questionId).exec();
    const correct = question.correctAnswer === answer;
    if (correct) {
      await this.updateScore(userId);
    }
    return correct;
  }

  async updateScore(userId: string): Promise<void> {
    const score = await this.scoreModel.findOne({ userId });
    if (score) {
      score.score += 10;
      await score.save();
    } else {
      const newScore = new this.scoreModel({ userId, score: 10 });
      await newScore.save();
    }
  }

  async getQuestions(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async getQuiz(quizId: string, id: string): Promise<Quiz> {
    return this.quizModel.findOne({ quizId, _id: id });
  }

  async getLeaderboard(): Promise<Score[]> {
    return this.scoreModel.find().sort({ score: -1 }).exec();
  }
}
