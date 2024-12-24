import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Quiz, QuizSchema } from '../schemas/quiz.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { QuestionSchema } from 'src/schemas/question.schema';
import { ScoreSchema } from 'src/schemas/score.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]),
    MongooseModule.forFeature([{ name: 'Score', schema: ScoreSchema }]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
