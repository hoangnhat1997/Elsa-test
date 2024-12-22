// src/gateway/quiz.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';

@WebSocketGateway()
export class QuizGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly userService: UserService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinQuiz')
  async handleJoinQuiz(
    client: Socket,
    payload: { quizId: string; nickname: string },
  ) {
    // Add user to quiz and notify others
    await this.userService.addUserToQuiz(payload.quizId, payload.nickname);
    this.server.emit('userJoined', payload);
  }

  @SubscribeMessage('submitAnswer')
  async handleSubmitAnswer(
    client: Socket,
    payload: { quizId: string; nickname: string; score: number },
  ) {
    // Update user score and notify others
    await this.userService.updateUserScore(
      payload.quizId,
      payload.nickname,
      payload.score,
    );
    const leaderboard = await this.userService.getLeaderboard(payload.quizId);
    this.server.emit('scoreUpdated', leaderboard);
  }
}
