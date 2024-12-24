import { connect, connection } from 'mongoose';
import { QuestionSchema } from 'src/schemas/question.schema';
import * as questions from './questions.json';

const Question = connection.model('Question', QuestionSchema);

async function seedDatabase() {
  await connect('mongodb://localhost/quiz'); // Update with your MongoDB connection string

  await Question.insertMany(questions);
  console.log('Database seeded with questions');
  connection.close();
}

seedDatabase().catch((err) => console.error(err));
