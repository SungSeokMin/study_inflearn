import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_architecture/data/photo_api_repository.dart';
import 'package:flutter_architecture/model/photo_model.dart';

class HomeViewModel with ChangeNotifier {
  final PhotoApiRepository repository;

  List<Photo> _photos = [];

  List<Photo> get photos => _photos;

  HomeViewModel(
    this.repository,
  );

  Future<void> fetch(String query) async {
    final result = await repository.fetch(query);
    _photos = result;
    notifyListeners();
  }
}
