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
        renderSliverAppBar(),
        renderChildSliverList(),
        renderBuildSliverList(),
        renderBuildSliverList(),
        renderSliverGridBuilder(),
      ],
    ));
  }

  // AppBar
  SliverAppBar renderSliverAppBar() {
    return SliverAppBar(
      titleTextStyle: const TextStyle(
        color: Colors.white,
        fontSize: 20.0,
      ),
      // 스크롤 했을 때 리스트의 중간에도 AppBar가 내려오게 할 수 있음.
      floating: true,
      // 스크롤 했을 때 AppBar를 상단에 고정할 수 있음.
      pinned: false,
      // 자석 효과, floating이 true인 경우에만 사용 가능
      snap: true,
      stretch: true,
      expandedHeight: 200.0,
      collapsedHeight: 150.0,
      flexibleSpace: FlexibleSpaceBar(
        background: Image.asset(
          'asset/img/image.jpeg',
          fit: BoxFit.cover,
        ),
      ),
      title: const Text('CustomScrollViewScreen'),
    );
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

  // GridView.count 유사함
  SliverGrid renderChildSliverGrid() {
    return SliverGrid(
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
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
      ),
    );
  }

  // GridView.builder와 유사함
  SliverGrid renderSliverGridBuilder() {
    return SliverGrid(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          return renderContainer(
            color: rainbowColors[index % rainbowColors.length],
            index: index,
          );
        },
        childCount: 100,
      ),
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 150,
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
