import 'package:flutter_intermediate/common/const/data.dart';

class DataUtils {
  static String pathToUrl(String thumbUrl) {
    return 'http://$ip$thumbUrl';
  }

  static List<String> listPathsToUrls(List paths) {
    return paths.map((path) => pathToUrl(path)).toList();
  }
}
