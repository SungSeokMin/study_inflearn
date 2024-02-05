import 'package:flutter/material.dart';
import 'package:u_and_i/screen/home_screen.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  runApp(const MaterialApp(
    localizationsDelegates: <LocalizationsDelegate<Object>>[
      GlobalMaterialLocalizations.delegate,
      GlobalWidgetsLocalizations.delegate,
      GlobalCupertinoLocalizations.delegate,
    ],
    supportedLocales: [
      Locale('ko', ''),
      Locale('en', ''),
    ],
    home: HomeScreen(),
  ));
}
