import 'package:flutter/material.dart';
import 'package:scrollable_widgets/const/colors.dart';
import 'package:scrollable_widgets/layout/main_layout.dart';

class RefreshIndicatorScreen extends StatelessWidget {
  final List<int> numbers = List.generate(100, (index) => index);

  RefreshIndicatorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      title: 'RefreshIndicatorScreen',
      body: RefreshIndicator(
        onRefresh: () async {
          await Future.delayed(
            const Duration(
              seconds: 3,
            ),
          );
        },
        child: ListView(
          children: numbers
              .map(
                (number) => renderContainer(
                  color: rainbowColors[number % rainbowColors.length],
                  index: number,
                ),
              )
              .toList(),
        ),
      ),
    );
  }

  Widget renderContainer({
    required Color color,
    required int index,
    double? height,
  }) {
    print(index);

    return Container(
      key: Key(index.toString()),
      height: height ?? 300.0,
      color: color,
      child: Center(
        child: Text(
          index.toString(),
          style: const TextStyle(
            color: Colors.white,
            fontSize: 30.0,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
    );
  }
}
