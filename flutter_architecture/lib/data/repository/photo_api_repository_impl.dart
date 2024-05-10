import 'package:flutter_architecture/data/data_source/pixabay_api.dart';
import 'package:flutter_architecture/data/data_source/result.dart';
import 'package:flutter_architecture/domain/model/photo.dart';
import 'package:flutter_architecture/domain/repository/photo_api_repository.dart';

class PhotoApiRepositoryImpl implements PhotoApiRepository {
  final PixabayApi api;

  PhotoApiRepositoryImpl(this.api);

  @override
  Future<Result<List<Photo>>> fetch(String query) async {
    final Result<Iterable> result = await api.fetch(query);

    return result.when(
      success: (iterable) {
        return Result.success(iterable.map((hit) => Photo.fromJson(hit)).toList());
      },
      error: (message) {
        return Result.error(message);
      },
    );
  }
}
