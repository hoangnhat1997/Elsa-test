import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class QuizGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinQuiz')
  handleJoinQuiz(client: Socket, quizId: string): void {
    client.join(quizId);
    console.log(`Client ${client.id} joined quiz ${quizId}`);
  }

  @SubscribeMessage('submitAnswer')
  handleSubmitAnswer(
    client: Socket,
    data: { quizId: string; answer: any },
  ): void {
    const { quizId } = data;
    // Process answer and update scores
    this.server
      .to(quizId)
      .emit('updateScores', { userId: client.id, score: 10 }); // Example score
  }
}
