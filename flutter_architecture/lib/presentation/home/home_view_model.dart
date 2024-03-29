import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_architecture/data/data_source/result.dart';
import 'package:flutter_architecture/domain/model/photo_model.dart';
import 'package:flutter_architecture/domain/use_case/get_photos_use_case.dart';
import 'package:flutter_architecture/presentation/home/home_state.dart';
import 'package:flutter_architecture/presentation/home/home_ui_event.dart';

class HomeViewModel with ChangeNotifier {
  final GetPhotosUseCase getPhotosUseCase;

  HomeState _state = HomeState([], false);

  HomeState get state => _state;

  final _eventController = StreamController<HomeUiEvent>();

  Stream<HomeUiEvent> get eventStream => _eventController.stream;

  HomeViewModel(this.getPhotosUseCase,);

  Future<void> fetch(String query) async {
    _state = state.copyWith(isLoading: true);
    notifyListeners();

    final result = await getPhotosUseCase.execute(query);

    switch (result) {
      case Success<List<Photo>>():
        _state = state.copyWith(photos: result.data);
        notifyListeners();
      case Error<List<Photo>>():
        _eventController.add(HomeUiEvent.showSnackBar(result.message));
    }

    _state = state.copyWith(isLoading: false);
    notifyListeners();
  }
}
