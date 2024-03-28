import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_architecture/data/api.dart';
import 'package:flutter_architecture/model/photo.model.dart';

class PhotoProvider extends InheritedWidget {
  final PixabayApi api;

  final _photoSteamController = StreamController<List<Photo>>()..add([]);

  Stream<List<Photo>> get photoStream => _photoSteamController.stream;

  PhotoProvider({
    super.key,
    required this.api,
    required super.child,
  });

  static PhotoProvider of(BuildContext context) {
    final PhotoProvider? result = context.dependOnInheritedWidgetOfExactType<PhotoProvider>();

    assert(result != null, 'No PixabayApi found in context');

    return result!;
  }

  Future<void> fetch(String query) async {
    final result = await api.fetch(query);
    _photoSteamController.add(result);
  }

  @override
  bool updateShouldNotify(PhotoProvider oldWidget) {
    return oldWidget.api != api;
  }
}
