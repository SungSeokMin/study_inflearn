import 'package:flutter/material.dart';
import 'package:flutter_architecture/ui/home_view_model.dart';
import 'package:flutter_architecture/ui/widget/photo_widget.dart';
import 'package:provider/provider.dart';

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
    return IconButton(
      onPressed: () async {
        context.read<HomeViewModel>().fetch(controller.text);
      },
      icon: const Icon(Icons.search),
    );
  }

  Consumer<HomeViewModel> buildGridView() {
    return Consumer<HomeViewModel>(
      builder: (_, viewModel, child) {
        return Expanded(
          child: GridView.builder(
            padding: const EdgeInsets.all(16),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
            ),
            itemCount: viewModel.photos.length,
            itemBuilder: (_, index) {
              final photo = viewModel.photos[index];

              return PhotoWidget(photo: photo);
            },
          ),
        );
      },
    );
  }
}
