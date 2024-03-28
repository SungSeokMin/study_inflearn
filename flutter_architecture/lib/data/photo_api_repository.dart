import 'package:flutter_architecture/model/photo.model.dart';

abstract class PhotoApiRepository {
  Future<List<Photo>> fetch(String query);
}
