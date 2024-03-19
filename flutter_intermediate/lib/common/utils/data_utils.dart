import 'dart:convert';

import 'package:flutter_intermediate/common/const/data.dart';

class DataUtils {
  static String pathToUrl(String thumbUrl) {
    return 'http://$ip$thumbUrl';
  }

  static List<String> listPathsToUrls(List paths) {
    return paths.map((path) => pathToUrl(path)).toList();
  }

  static String plainToBase64(String plain) {
    Codec<String, String> stringToBase64 = utf8.fuse(base64);
    String encoded = stringToBase64.encode(plain);

    return encoded;
  }
}
