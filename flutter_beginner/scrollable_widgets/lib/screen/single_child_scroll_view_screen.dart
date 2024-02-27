import 'package:flutter/material.dart';
import 'package:scrollable_widgets/const/colors.dart';
import 'package:scrollable_widgets/layout/main_layout.dart';

class SingleChildScrollViewScreen extends StatelessWidget {
  const SingleChildScrollViewScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      title: 'SingleChildScrollView',
      body: renderSimple(),
    );
  }

  // 1. 기본 렌더링 -> 화면을 넘어가지 않으면 스크롤이 되지 않는다.
  Widget renderSimple() {
    return SingleChildScrollView(
      child: Column(
        children: rainbowColors
            .map(
              (color) => renderContainer(color: color),
            )
            .toList(),
      ),
    );
  }

  // 2. 화면을 넘어가지 않아도 스크롤 가능 단, 위젯의 크기 내에서 움직인다.
  Widget renderAlwaysScroll() {
    return SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      child: Column(
        children: [
          renderContainer(color: Colors.black),
        ],
      ),
    );
  }

  // 3. 화면을 넘어가지 않아도 스크롤 가능
  Widget renderClip() {
    return SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      clipBehavior: Clip.none,
      child: Column(
        children: [
          renderContainer(color: Colors.black),
        ],
      ),
    );
  }

  // 4. 여러가지 physics 정리
  Widget renderPhysics() {
    return SingleChildScrollView(
      // NeverScrollableScrollPhysics - 스크롤 안됨
      // AlwaysScrollableScrollPhysics - 스크롤 가능
      // BouncingScrollPhysics - IOS 스타일 (튕김)
      // ClampingScrollPhysics - Android 스타일 (안튕김)
      physics: const ClampingScrollPhysics(),
      child: Column(
        children: rainbowColors
            .map(
              (color) => renderContainer(color: color),
            )
            .toList(),
      ),
    );
  }

  // 5. 퍼포먼스
  Widget renderPerformance() {
    final List<int> numbers = List.generate(100, (index) => index);

    return SingleChildScrollView(
      child: Column(
        children: numbers
            .map(
              (number) => renderContainer(
                  color: rainbowColors[number % rainbowColors.length], index: number),
            )
            .toList(),
      ),
    );
  }

  Widget renderContainer({
    required Color color,
    int? index,
  }) {
    if (index != null) print('index');

    return Container(
      height: 300.0,
      color: color,
    );
  }
}
