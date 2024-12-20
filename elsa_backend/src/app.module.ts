import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/quiz'), // Update with your MongoDB connection string
    QuizModule,
  ],
})
export class AppModule {}
