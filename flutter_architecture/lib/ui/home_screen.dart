import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

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
      onPressed: () {
        print('[home_screen.dart, 28] : hi');
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
        itemCount: 100,
        itemBuilder: (_, __) {
          return Container(
            decoration: const BoxDecoration(
              borderRadius: BorderRadius.all(
                Radius.circular(16),
              ),
              image: DecorationImage(
                image: NetworkImage(
                  'https://www.tving.com/img/tving-favicon-160@3x.png',
                ),
                fit: BoxFit.cover,
              ),
            ),
          );
        },
      ),
    );
  }
}
