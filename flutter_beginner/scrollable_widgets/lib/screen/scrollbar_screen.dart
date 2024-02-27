import 'package:flutter/material.dart';
import 'package:scrollable_widgets/const/colors.dart';
import 'package:scrollable_widgets/layout/main_layout.dart';

class ScrollBarScreen extends StatelessWidget {
  final List<int> numbers = List.generate(100, (index) => index);

  ScrollBarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
        title: 'ScrollBarScreen',
        body: Scrollbar(
          child: SingleChildScrollView(
            child: Column(
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
        ));
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
