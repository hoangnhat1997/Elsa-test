// lib/screens/home_screen.dart
import 'package:elsa_app/providers/quiz_provider.dart';
import 'package:elsa_app/screens/quiz_screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatelessWidget {
  final _nicknameController = TextEditingController();
  final _quizIdController = TextEditingController();

  HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Quiz App'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _nicknameController,
              decoration: const InputDecoration(labelText: 'Nickname'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Provider.of<QuizProvider>(context, listen: false)
                    .createQuiz(_nicknameController.text);
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const QuizScreen()),
                );
              },
              child: const Text('Create Quiz'),
            ),
            TextField(
              controller: _quizIdController,
              decoration: const InputDecoration(labelText: 'Quiz ID'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Provider.of<QuizProvider>(context, listen: false)
                    .joinQuiz(_quizIdController.text, _nicknameController.text);
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const QuizScreen()),
                );
              },
              child: const Text('Join Quiz'),
            ),
          ],
        ),
      ),
    );
  }
}
