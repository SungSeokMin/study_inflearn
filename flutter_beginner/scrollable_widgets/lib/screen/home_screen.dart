import 'package:flutter/material.dart';
import 'package:scrollable_widgets/layout/main_layout.dart';
import 'package:scrollable_widgets/screen/custom_scroll_view_screen.dart';
import 'package:scrollable_widgets/screen/grid_view_screen.dart';
import 'package:scrollable_widgets/screen/list_view_screen.dart';
import 'package:scrollable_widgets/screen/refresh_indicator.dart';
import 'package:scrollable_widgets/screen/reorderable_list_view_screen.dart';
import 'package:scrollable_widgets/screen/scrollbar_screen.dart';
import 'package:scrollable_widgets/screen/single_child_scroll_view_screen.dart';

class ScreenModel {
  final WidgetBuilder builder;
  final String title;

  ScreenModel({
    required this.builder,
    required this.title,
  });
}

class HomeScreen extends StatelessWidget {
  final screens = [
    ScreenModel(
      builder: (_) => const SingleChildScrollViewScreen(),
      title: 'SingleChildScrollViewScreen',
    ),
    ScreenModel(
      builder: (_) => ListViewScreen(),
      title: 'ListViewScreen',
    ),
    ScreenModel(
      builder: (_) => GridViewScreen(),
      title: 'GridViewScreen',
    ),
    ScreenModel(
      builder: (_) => const ReorderableListViewScreen(),
      title: 'ReorderableListViewScreen',
    ),
    ScreenModel(
      builder: (_) => CustomScrollViewScreen(),
      title: 'CustomScrollViewScreen',
    ),
    ScreenModel(
      builder: (_) => ScrollBarScreen(),
      title: 'ScrollBarScreen',
    ),
    ScreenModel(
      builder: (_) => RefreshIndicatorScreen(),
      title: 'RefreshIndicatorScreen',
    ),
  ];

  HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      title: 'Home',
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8.0),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: screens
                .map(
                  (screen) => ElevatedButton(
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: screen.builder,
                        ),
                      );
                    },
                    child: Text(screen.title),
                  ),
                )
                .toList(),
          ),
        ),
      ),
    );
  }
}