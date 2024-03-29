import 'package:flutter_architecture/domain/model/photo_model.dart';

abstract class PhotoApiRepository {
  Future<List<Photo>> fetch(String query);
}
