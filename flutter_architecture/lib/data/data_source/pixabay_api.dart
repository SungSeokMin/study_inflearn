import 'dart:convert';

import 'package:flutter_architecture/data/data_source/result.dart';
import 'package:http/http.dart' as http;

class PixabayApi {
  final http.Client client;

  PixabayApi(this.client);

  static const baseUrl = 'https://pixabay.com/api/';
  static const key = '23377613-9fc7315240ffa4544f10f1e82';

  Future<Result<Iterable>> fetch(String query) async {
    try {
      final response = await client.get(
        Uri.parse('$baseUrl?key=$key&q=$query&image_type=photo&pretty=true'),
      );

      Map<String, dynamic> jsonResponse = jsonDecode(response.body);
      Iterable hits = jsonResponse['hits'];

      return Result.success(hits);
    } catch (err) {
      return Result.error('네트워크 에러');
    }
  }
}
