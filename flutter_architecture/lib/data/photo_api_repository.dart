import 'package:flutter_architecture/model/photo.dart';

abstract class PhotoApiRepository {
  Future<List<Photo>> fetch(String query);
}
