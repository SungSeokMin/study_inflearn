import 'package:flutter/material.dart';
import 'package:scrollable_widgets/const/colors.dart';

class CustomScrollViewScreen extends StatelessWidget {
  final List<int> numbers = List.generate(100, (index) => index);

  CustomScrollViewScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: CustomScrollView(
      slivers: [
        const SliverAppBar(
          title: Text('CustomScrollViewScreen'),
        ),
        renderBuildSliverList(),
      ],
    ));
  }

  // ListView 기본 생성자와 유사함.
  SliverList renderChildSliverList() {
    return SliverList(
      delegate: SliverChildListDelegate(
        numbers
            .map(
              (number) => renderContainer(
                color: rainbowColors[number % rainbowColors.length],
                index: number,
              ),
            )
            .toList(),
      ),
    );
  }

  // ListView.builder 생성자와 유사함.
  SliverList renderBuildSliverList() {
    return SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          return renderContainer(
            color: rainbowColors[index % rainbowColors.length],
            index: index,
          );
        },
        childCount: 100,
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
