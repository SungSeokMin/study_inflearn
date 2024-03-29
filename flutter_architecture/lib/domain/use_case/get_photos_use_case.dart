import 'dart:math';

import 'package:flutter_architecture/data/data_source/result.dart';
import 'package:flutter_architecture/domain/model/photo_model.dart';
import 'package:flutter_architecture/domain/repository/photo_api_repository.dart';

class GetPhotosUseCase {
  final PhotoApiRepository repository;

  GetPhotosUseCase(this.repository);

  Future<Result<List<Photo>>> execute(String query) async {
    final result = await repository.fetch(query);

    switch (result) {
      case Success<List<Photo>>():
        return Result.success(result.data.sublist(0, min(3, result.data.length)));
      case Error<List<Photo>>():
        return Result.error(result.message);
    }
  }
}
