import 'package:flutter/material.dart';
import 'package:flutter_architecture/di/provider_setup.dart';
import 'package:flutter_architecture/presentation/home/home_screen.dart';
import 'package:provider/provider.dart';

void main() {
  return runApp(
    MultiProvider(
      providers: globalProviders,
      child: const MaterialApp(
        home: HomeScreen(),
      ),
    ),
  );
}
