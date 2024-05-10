import 'package:flutter/material.dart';
import 'package:flutter_architecture/data/api.dart';
import 'package:flutter_architecture/data/photo_provider.dart';
import 'package:flutter_architecture/ui/home_screen.dart';
import 'package:flutter_architecture/ui/home_view_model.dart';

void main() {
  return runApp(
    MaterialApp(
      home: PhotoProvider(
        viewModel: HomeViewModel(
          api: PixabayApi(),
        ),
        child: const HomeScreen(),
      ),
    ),
  );
}
