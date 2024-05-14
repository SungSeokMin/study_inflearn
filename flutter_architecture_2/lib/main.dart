import 'package:flutter/material.dart';
import 'package:flutter_architecture/presentation/notes/notes_screen.dart';
import 'package:flutter_architecture/ui/colors.dart';

void main() {
  runApp(
    const MyApp(),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.white,
        scaffoldBackgroundColor: darkGray,
        floatingActionButtonTheme: Theme.of(context).floatingActionButtonTheme.copyWith(
              backgroundColor: lightBlue,
              foregroundColor: darkGray,
            ),
        appBarTheme: Theme.of(context).appBarTheme.copyWith(
              backgroundColor: darkGray,
              foregroundColor: lightBlue,
            ),
      ),
      home: const NotesScreen(),
    );
  }
}
