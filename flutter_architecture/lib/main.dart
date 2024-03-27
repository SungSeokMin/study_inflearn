import 'package:flutter/material.dart';
import 'package:flutter_architecture/data/api.dart';
import 'package:flutter_architecture/data/photo_provider.dart';
import 'package:flutter_architecture/ui/home_screen.dart';

void main() {
  return runApp(
    MaterialApp(
      home: PhotoProvider(
        api: PixabayApi(),
        child: const HomeScreen(),
      ),
    ),
  );
}
