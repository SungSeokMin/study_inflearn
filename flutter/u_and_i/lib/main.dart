import 'package:flutter/material.dart';
import 'package:u_and_i/screen/home_screen.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  runApp(
    MaterialApp(
      localizationsDelegates: const <LocalizationsDelegate<Object>>[
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('ko', ''),
        Locale('en', ''),
      ],
      home: const HomeScreen(),
      theme: ThemeData(
        fontFamily: 'sunflower',
        textTheme: const TextTheme(
            displayLarge: TextStyle(color: Colors.white, fontFamily: 'parisienne', fontSize: 80.0),
            displayMedium:
                TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 50.0),
            bodyLarge: TextStyle(color: Colors.white, fontSize: 30.0),
            bodyMedium: TextStyle(color: Colors.white, fontSize: 20.0)),
      ),
    ),
  );
}
