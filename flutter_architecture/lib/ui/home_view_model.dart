import 'dart:async';

import 'package:flutter_architecture/data/photo_api_repository.dart';
import 'package:flutter_architecture/model/photo_model.dart';

class HomeViewModel {
  final PhotoApiRepository repository;

  final _photoSteamController = StreamController<List<Photo>>()..add([]);

  Stream<List<Photo>> get photoStream => _photoSteamController.stream;

  HomeViewModel(
    this.repository,
  );

  Future<void> fetch(String query) async {
    final result = await repository.fetch(query);
    _photoSteamController.add(result);
  }
}
