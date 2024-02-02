import 'package:blog_web_app/screens/home_screen.dart';
import 'package:flutter/material.dart';

void main() {
  // flutter 프레임워크가 실행할 준비가 될때까지 기다린다.
  WidgetsFlutterBinding.ensureInitialized();

  runApp(MaterialApp(
    home: HomeScreen(),
  ));
}
