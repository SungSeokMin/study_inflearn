import 'package:flutter_architecture/data/data_source/pixabay_api.dart';
import 'package:flutter_architecture/domain/model/photo_model.dart';
import 'package:flutter_architecture/domain/repository/photo_api_repository.dart';

class PhotoApiRepositoryImpl implements PhotoApiRepository {
  final PixabayApi api;

  PhotoApiRepositoryImpl(this.api);

  @override
  Future<List<Photo>> fetch(String query) async {
    final result = await api.fetch(query);

    return result.map((hit) => Photo.fromJson(hit)).toList();
  }
}
