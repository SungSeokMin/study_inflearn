import 'dart:convert';

import 'package:flutter_architecture/model/photo.dart';
import 'package:http/http.dart' as http;

class PixabayApi {
  final baseUrl = 'https://pixabay.com/api/';
  final key = '23377613-9fc7315240ffa4544f10f1e82';

  Future<List<Photo>> fetch(String query) async {
    final response =
        await http.get(Uri.parse('$baseUrl?key=$key&q=$query&image_type=photo&pretty=true'));

    Map<String, dynamic> jsonResponse = jsonDecode(response.body);
    Iterable hits = jsonResponse['hits'];
    return hits.map((hit) => Photo.fromJson(hit)).toList();
  }
}
