import 'package:flutter/material.dart';
import 'package:flutter_architecture/data/photo_provider.dart';
import 'package:flutter_architecture/data/pixabay_api.dart';
import 'package:flutter_architecture/ui/home_screen.dart';
import 'package:flutter_architecture/ui/home_view_model.dart';

void main() {
  return runApp(
    MaterialApp(
      home: PhotoProvider(
        viewModel: HomeViewModel(
          repository: PixabayApi(),
        ),
        child: const HomeScreen(),
      ),
    ),
  );
}
