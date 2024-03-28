import 'package:flutter/material.dart';
import 'package:flutter_architecture/data/pixabay_api.dart';
import 'package:flutter_architecture/ui/home_screen.dart';
import 'package:flutter_architecture/ui/home_view_model.dart';
import 'package:provider/provider.dart';

void main() {
  return runApp(
    MaterialApp(
      home: Provider(
        create: (_) => HomeViewModel(PixabayApi()),
        child: const HomeScreen(),
      ),
    ),
  );
}
