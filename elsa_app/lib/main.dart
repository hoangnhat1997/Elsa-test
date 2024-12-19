import 'package:flutter/material.dart';
import 'quiz_service.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: QuizListScreen(),
    );
  }
}

class QuizListScreen extends StatefulWidget {
  @override
  _QuizListScreenState createState() => _QuizListScreenState();
}

class _QuizListScreenState extends State<QuizListScreen> {
  final QuizService _quizService = QuizService();
  late Future<List<dynamic>> _quizzes;
  List<dynamic> _scores = [];

  @override
  void initState() {
    super.initState();
    _quizzes = _quizService.fetchQuizzes();
    _quizService.listenForScoreUpdates((data) {
      setState(() {
        _scores.add(data);
      });
    });
  }

  void _joinQuiz(String quizId) {
    _quizService.joinQuiz(quizId);
  }

  void _submitAnswer(String quizId, dynamic answer) {
    _quizService.submitAnswer(quizId, answer);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Quizzes'),
      ),
      body: FutureBuilder<List<dynamic>>(
        future: _quizzes,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            return Column(
              children: [
                Expanded(
                  child: ListView(
                    children: snapshot.data!.map((quiz) {
                      return ListTile(
                        title: Text(quiz['title']),
                        onTap: () {
                          _joinQuiz(quiz['_id']);
                          _submitAnswer(quiz['_id'], 'Sample Answer');
                        },
                      );
                    }).toList(),
                  ),
                ),
                Expanded(
                  child: ListView(
                    children: _scores.map((score) {
                      return ListTile(
                        title: Text(
                            'User: ${score['userId']} - Score: ${score['score']}'),
                      );
                    }).toList(),
                  ),
                ),
              ],
            );
          }
        },
      ),
    );
  }
}
