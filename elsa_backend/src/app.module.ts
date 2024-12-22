// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModule } from './quiz/quiz.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      load: [databaseConfig],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGO_DB_URI'),
    //     connectionFactory: (connection: any) => {
    //       connection.on('connected', () => {
    //         console.log('DB is connected');
    //       });

    //       connection.on('disconnected', () => {
    //         console.log('DB is disconnected');
    //       });

    //       connection.on('reconnected', () => {
    //         console.log('DB is reconnected');
    //       });
    //       return connection;
    //     },
    //   }),

    //   inject: [ConfigService],
    // }),
    // RedisModule.register({
    //   url: process.env.REDIS_URL,
    // }),
    QuizModule,
    UserModule,
  ],
})
export class AppModule {}
