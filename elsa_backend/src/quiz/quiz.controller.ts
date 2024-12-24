import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { JoinQuizDto } from './dto/join-quiz.dto';
import { Question } from 'src/schemas/question.schema';

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

  @Get(':quizId/:id')
  async getQuiz(@Param('quizId') quizId: string, @Param('id') id: string) {
    return this.quizService.getQuiz(quizId, id);
  }

  @Get('questions')
  async getQuestions(): Promise<Question[]> {
    return this.quizService.getQuestions();
  }

  @Post('answer')
  async submitAnswer(
    @Body() data: { userId: string; questionId: string; answer: number },
  ): Promise<{ correct: boolean }> {
    const correct = await this.quizService.submitAnswer(
      data.userId,
      data.questionId,
      data.answer,
    );
    return { correct };
  }

  @Get('leaderboard')
  async getLeaderboard() {
    return this.quizService.getLeaderboard();
  }
}
