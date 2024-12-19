import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:socket_io_client/socket_io_client.dart' as IO;

class QuizService {
  final String baseUrl = 'http://localhost:3000';
  late IO.Socket socket;

  QuizService() {
    socket = IO.io(baseUrl, <String, dynamic>{
      'transports': ['websocket'],
    });
  }

  Future<List<dynamic>> fetchQuizzes() async {
    final response = await http.get(Uri.parse('$baseUrl/quiz'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load quizzes');
    }
  }

  void joinQuiz(String quizId) {
    socket.emit('joinQuiz', quizId);
  }

  void submitAnswer(String quizId, dynamic answer) {
    socket.emit('submitAnswer', {'quizId': quizId, 'answer': answer});
  }

  void listenForScoreUpdates(Function(dynamic) callback) {
    socket.on('updateScores', (data) {
      callback(data);
    });
  }
}
