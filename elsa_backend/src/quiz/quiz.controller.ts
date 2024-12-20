import { Controller, Post, Get, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from 'src/schemas/quiz.schema';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(@Body() quiz: Quiz) {
    return this.quizService.createQuiz(quiz);
  }

  @Get()
  async getQuizzes() {
    return this.quizService.getQuizzes();
  }

  // Add more endpoints as needed
}
