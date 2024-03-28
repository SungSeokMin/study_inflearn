import 'package:flutter_architecture/model/photo_model.dart';

abstract class PhotoApiRepository {
  Future<List<Photo>> fetch(String query);
}
