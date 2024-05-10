import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_architecture/data/photo_api_repository.dart';
import 'package:flutter_architecture/model/photo.dart';

class HomeViewModel with ChangeNotifier {
  final PhotoApiRepository repository;

  HomeViewModel({
    required this.repository,
  });

  List<Photo> _photos = [];

  List<Photo> get photos => _photos;

  Future<void> fetch(String query) async {
    final result = await repository.fetch(query);

    _photos = result;
    notifyListeners();
  }
}
