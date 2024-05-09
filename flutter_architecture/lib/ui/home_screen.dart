import 'package:flutter/material.dart';
import 'package:flutter_architecture/data/photo_provider.dart';
import 'package:flutter_architecture/model/photo.dart';
import 'package:flutter_architecture/ui/widget/photo_widget.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({
    super.key,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final controller = TextEditingController();

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
    final photoProvider = PhotoProvider.of(context);

    return IconButton(
      onPressed: () async {
        photoProvider.fetch(controller.text);
      },
      icon: const Icon(Icons.search),
    );
  }

  StreamBuilder<List<Photo>> buildGridView() {
    final photoProvider = PhotoProvider.of(context);

    return StreamBuilder<List<Photo>>(
      stream: photoProvider.photoStream,
      builder: (context, snapshot) {
        if (!snapshot.hasData) return const CircularProgressIndicator();

        final photos = snapshot.data!;

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
      },
    );
  }
}
