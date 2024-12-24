// lib/screens/quiz_screen.dart
import 'package:elsa_app/providers/quiz_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class QuizScreen extends StatelessWidget {
  const QuizScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final quizProvider = Provider.of<QuizProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Quiz ID: ${quizProvider.quizId}',
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: quizProvider.userNicknames.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(quizProvider.userNicknames[index]),
                );
              },
            ),
          ),
          ElevatedButton(
            onPressed: () {
              quizProvider.submitAnswer(
                  'yourNickname', 10); // Example submission
            },
            child: const Text('Submit Answer'),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: quizProvider.leaderboard.keys.length,
              itemBuilder: (context, index) {
                final nickname = quizProvider.leaderboard.keys.elementAt(index);
                return ListTile(
                  title:
                      Text('$nickname: ${quizProvider.leaderboard[nickname]}'),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
