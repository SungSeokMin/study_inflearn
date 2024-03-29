import 'package:flutter/material.dart';
import 'package:flutter_architecture/data/data_source/pixabay_api.dart';
import 'package:flutter_architecture/data/repository/photo_api_repository_impl.dart';
import 'package:flutter_architecture/presentation/home/home_screen.dart';
import 'package:flutter_architecture/presentation/home/home_view_model.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

void main() {
  return runApp(
    MaterialApp(
      home: ChangeNotifierProvider(
        create: (_) =>
            HomeViewModel(PhotoApiRepositoryImpl(PixabayApi(http.Client()))),
        child: const HomeScreen(),
      ),
    ),
  );
}
