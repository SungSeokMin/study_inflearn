import 'package:flutter_architecture/data/data_source/result.dart';
import 'package:flutter_architecture/domain/model/photo.dart';

abstract class PhotoApiRepository {
  Future<Result<List<Photo>>> fetch(String query);
}
