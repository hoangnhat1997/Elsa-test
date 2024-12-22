// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Quiz } from '../schemas/quiz.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
  ) {}

  async addUserToQuiz(quizId: string, nickname: string): Promise<User> {
    const user = new this.userModel({ nickname, quizId });
    await user.save();

    // Add user to quiz
    await this.quizModel.updateOne(
      { quizId },
      { $push: { userNicknames: nickname } },
    );

    return user;
  }

  async updateUserScore(
    quizId: string,
    nickname: string,
    score: number,
  ): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { quizId, nickname },
      { $inc: { score } },
      { new: true },
    );
    return user;
  }

  async getLeaderboard(quizId: string): Promise<User[]> {
    return this.userModel.find({ quizId }).sort({ score: -1 });
  }
}
