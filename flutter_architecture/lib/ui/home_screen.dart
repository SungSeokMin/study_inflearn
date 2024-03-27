import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_architecture/model/photo.model.dart';
import 'package:flutter_architecture/ui/ui/photo_widget.dart';
import 'package:http/http.dart' as http;

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _controller = TextEditingController();

  List<Photo> _photos = [];

  Future<List<Photo>> fetch(String query) async {
    final response = await http.get(
      Uri.parse(
        'https://pixabay.com/api/?key=23377613-9fc7315240ffa4544f10f1e82&q=$query}&image_type=photo&pretty=true',
      ),
    );

    Map<String, dynamic> jsonResponse = jsonDecode(response.body);
    Iterable hits = jsonResponse['hits'];

    return hits.map((hit) => Photo.fromJson(hit)).toList();
  }

  @override
  void dispose() {
    _controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text(
          '이미지 검색 앱',
          style: TextStyle(color: Colors.black),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _controller,
              decoration: InputDecoration(
                border: const OutlineInputBorder(
                  borderRadius: BorderRadius.all(
                    Radius.circular(10.0),
                  ),
                ),
                suffixIcon: IconButton(
                  onPressed: () async {
                    final photos = await fetch(_controller.text);

                    setState(() {
                      _photos = photos;
                    });
                  },
                  icon: const Icon(Icons.search),
                ),
              ),
            ),
          ),
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.all(16),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
              ),
              itemCount: _photos.length,
              itemBuilder: (context, index) {
                final photo = _photos[index];

                return PhotoWidget(
                  photo: photo,
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
