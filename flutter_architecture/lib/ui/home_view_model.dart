import 'dart:async';

import 'package:flutter_architecture/data/photo_api_repository.dart';
import 'package:flutter_architecture/model/photo.dart';

class HomeViewModel {
  final PhotoApiRepository repository;

  HomeViewModel({
    required this.repository,
  });

  final photoStreamController = StreamController<List<Photo>>()..add([]);

  Stream<List<Photo>> get photoStream => photoStreamController.stream;

  Future<void> fetch(String query) async {
    final result = await repository.fetch(query);

    photoStreamController.add(result);
  }
}
