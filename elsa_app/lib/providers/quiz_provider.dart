// lib/providers/quiz_provider.dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:socket_io_client/socket_io_client.dart' as IO;

class QuizProvider with ChangeNotifier {
  late IO.Socket _socket;
  late String _quizId;
  final List<String> _userNicknames = [];
  Map<String, int> _leaderboard = {};

  QuizProvider() {
    _socket = IO.io('http://localhost:3000', <String, dynamic>{
      'transports': ['websocket'],
    });

    _socket.on('userJoined', (data) {
      _userNicknames.add(data['nickname']);
      notifyListeners();
    });

    _socket.on('scoreUpdated', (data) {
      _leaderboard = Map<String, int>.from(data);
      notifyListeners();
    });
  }

  String get quizId => _quizId;
  List<String> get userNicknames => _userNicknames;
  Map<String, int> get leaderboard => _leaderboard;

  Future<void> createQuiz(String nickname) async {
    final response = await http.post(
      Uri.parse('http://localhost:3000/quiz'),
      body: {'creatorNickname': nickname},
    );
    final responseData = jsonDecode(response.body);
    _quizId = responseData['quizId'];
    notifyListeners();
  }

  void joinQuiz(String quizId, String nickname) {
    _quizId = quizId;
    _socket.emit('joinQuiz', {'quizId': quizId, 'nickname': nickname});
    notifyListeners();
  }

  void submitAnswer(String nickname, int score) {
    _socket.emit('submitAnswer',
        {'quizId': _quizId, 'nickname': nickname, 'score': score});
  }
}
