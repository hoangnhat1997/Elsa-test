import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from './quiz.controller';
import { QuizSchema } from 'src/schemas/quiz.schema';
import { QuizService } from './quiz.service';
import { QuizGateway } from './quiz.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Quiz', schema: QuizSchema }])],
  controllers: [QuizController],
  providers: [QuizService, QuizGateway],
})
export class QuizModule {}
