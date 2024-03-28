import 'dart:async';

import 'package:flutter_architecture/data/api.dart';
import 'package:flutter_architecture/model/photo.model.dart';

class HomeViewModel {
  final PixabayApi api;

  final _photoSteamController = StreamController<List<Photo>>()..add([]);

  Stream<List<Photo>> get photoStream => _photoSteamController.stream;

  HomeViewModel(
    this.api,
  );

  Future<void> fetch(String query) async {
    final result = await api.fetch(query);
    _photoSteamController.add(result);
  }
}
