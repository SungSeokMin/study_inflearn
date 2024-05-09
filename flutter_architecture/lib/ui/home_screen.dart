import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_architecture/model/photo.dart';
import 'package:flutter_architecture/ui/widget/photo_widget.dart';
import 'package:http/http.dart' as http;

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final controller = TextEditingController();

  List<Photo> photos = [];

  Future<List<Photo>> fetch(String query) async {
    final response = await http.get(
      Uri.parse(
          'https://pixabay.com/api/?key=23377613-9fc7315240ffa4544f10f1e82&q=$query&image_type=photo&pretty=true'),
    );

    Map<String, dynamic> jsonResponse = jsonDecode(response.body);
    Iterable hits = jsonResponse['hits'];
    return hits.map((hit) => Photo.fromJson(hit)).toList();
  }

  @override
  void dispose() {
    controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          '이미지 검색 앱',
          style: TextStyle(
            color: Colors.black,
          ),
        ),
      ),
      body: Column(
        children: [
          buildSearch(),
          buildGridView(),
        ],
      ),
    );
  }

  Padding buildSearch() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          suffixIcon: buildIconButton(),
          border: const OutlineInputBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(10),
            ),
          ),
        ),
      ),
    );
  }

  IconButton buildIconButton() {
    return IconButton(
      onPressed: () async {
        final photos = await fetch(controller.text);
        setState(() {
          this.photos = photos;
        });
      },
      icon: const Icon(Icons.search),
    );
  }

  Expanded buildGridView() {
    return Expanded(
      child: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
        ),
        itemCount: photos.length,
        itemBuilder: (_, index) {
          final photo = photos[index];

          return PhotoWidget(photo: photo);
        },
      ),
    );
  }
}
