import 'package:flutter_architecture/data/data_source/pixabay_api.dart';
import 'package:flutter_architecture/data/data_source/result.dart';
import 'package:flutter_architecture/domain/model/photo_model.dart';
import 'package:flutter_architecture/domain/repository/photo_api_repository.dart';

class PhotoApiRepositoryImpl implements PhotoApiRepository {
  final PixabayApi api;

  PhotoApiRepositoryImpl(this.api);

  @override
  Future<Result<List<Photo>>> fetch(String query) async {
    final Result<Iterable> result = await api.fetch(query);

    switch (result) {
      case Success<Iterable>():
        return Result.success(result.data.map((hit) => Photo.fromJson(hit)).toList());
      case Error<Iterable>():
        return Result.error(result.message);
    }
  }
}
