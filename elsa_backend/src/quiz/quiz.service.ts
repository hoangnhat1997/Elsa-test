// src/quiz/quiz.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from '../schemas/quiz.schema';
import { User } from '../schemas/user.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { JoinQuizDto } from './dto/join-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    console.log(createQuizDto);

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
}
