import 'dart:async';

import 'package:flutter_architecture/data/api.dart';
import 'package:flutter_architecture/model/photo.dart';

class HomeViewModel {
  final PixabayApi api;

  HomeViewModel({
    required this.api,
  });

  final photoStreamController = StreamController<List<Photo>>()..add([]);

  Stream<List<Photo>> get photoStream => photoStreamController.stream;

  Future<void> fetch(String query) async {
    final result = await api.fetch(query);

    photoStreamController.add(result);
  }
}
