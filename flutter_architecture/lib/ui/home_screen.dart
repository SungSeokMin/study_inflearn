import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

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
          renderTextFiled(),
          renderGridView(),
        ],
      ),
    );
  }

  // 변수를 사용하지 않고 위젯만 사용한 경우 const를 집어넣는다.
  // 재사용이 가능하며, 메모리를 아낄 수 있다.
  Padding renderTextFiled() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: TextField(
        decoration: InputDecoration(
          border: const OutlineInputBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(10.0),
            ),
          ),
          suffixIcon: IconButton(
            onPressed: () {
              //
            },
            icon: const Icon(Icons.search),
          ),
        ),
      ),
    );
  }

  Expanded renderGridView() {
    return Expanded(
      child: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
        ),
        itemCount: 10,
        itemBuilder: (context, index) {
          return Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: NetworkImage(
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO8cqwcVTXLr1ClylUyrurV8kYdPaEztkbhrbpdQxgMQ&s'),
                fit: BoxFit.cover,
              ),
              borderRadius: BorderRadius.all(
                Radius.circular(16.0),
              ),
            ),
          );
        },
      ),
    );
  }
}
