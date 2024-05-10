import 'dart:async';
import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:flutter_architecture/data/data_source/result.dart';
import 'package:flutter_architecture/domain/model/photo.dart';
import 'package:flutter_architecture/domain/repository/photo_api_repository.dart';
import 'package:flutter_architecture/presentation/home/home_ui_event.dart';

class HomeViewModel with ChangeNotifier {
  final PhotoApiRepository repository;

  List<Photo> _photos = [];

  UnmodifiableListView<Photo> get photos => UnmodifiableListView(_photos);

  final _eventController = StreamController<HomeUiEvent>();

  Stream<HomeUiEvent> get eventStream => _eventController.stream;

  HomeViewModel(
    this.repository,
  );

  Future<void> fetch(String query) async {
    final Result<List<Photo>> result = await repository.fetch(query);

    result.when(success: (photos) {
      _photos = photos;
      notifyListeners();
    }, error: (message) {
      _eventController.add(HomeUiEvent.showSnackBar(message));
    });
  }
}
