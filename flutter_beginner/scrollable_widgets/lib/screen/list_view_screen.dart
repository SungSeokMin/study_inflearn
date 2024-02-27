import 'package:flutter/material.dart';
import 'package:scrollable_widgets/const/colors.dart';
import 'package:scrollable_widgets/layout/main_layout.dart';

class ListViewScreen extends StatelessWidget {
  final List<int> numbers = List.generate(100, (index) => index);

  ListViewScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      title: 'ListViewScreen',
      body: renderSeparated(),
    );
  }

  // 1. 모드 한 번에 그림
  Widget renderBuilder() {
    return ListView.builder(
      itemCount: 100,
      itemBuilder: (context, index) {
        return renderContainer(
          color: rainbowColors[index % rainbowColors.length],
          index: index,
        );
      },
    );
  }

  // 2. 보이는 것만 그림
  Widget renderDefault() {
    return ListView(
      children: numbers
          .map(
            (number) =>
                renderContainer(color: rainbowColors[number % rainbowColors.length], index: number),
          )
          .toList(),
    );
  }

  // 3. 중간 중간에 추가할 위젯을 정함
  Widget renderSeparated() {
    return ListView.separated(
      itemCount: 100,
      separatorBuilder: (context, index) {
        index += 1;

        if (index % 5 == 0) {
          return renderContainer(
            color: Colors.black,
            index: index,
            height: 100.0,
          );
        }
        return Container();
      },
      itemBuilder: (context, index) {
        return renderContainer(
          color: rainbowColors[index % rainbowColors.length],
          index: index,
        );
      },
    );
  }

  Widget renderContainer({
    required Color color,
    required int index,
    double? height,
  }) {
    print(index);

    return Container(
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
