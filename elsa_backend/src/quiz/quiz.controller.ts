import { Controller, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { JoinQuizDto } from './dto/join-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Post(':quizId/join')
  async joinQuiz(
    @Param('quizId') quizId: string,
    @Body() joinQuizDto: JoinQuizDto,
  ) {
    return this.quizService.joinQuiz(quizId, joinQuizDto);
  }
}
