import 'package:dusty_dust/component/card_title.dart';
import 'package:dusty_dust/component/main_card.dart';
import 'package:dusty_dust/component/main_stat.dart';

import 'package:flutter/material.dart';

class CategoryCard extends StatelessWidget {
  const CategoryCard({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 160,
        child: MainCard(
          child: LayoutBuilder(builder: (context, constraints) {
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const CardTitle(title: '종류별 통계'),
                Expanded(
                  child: ListView(
                    physics: const PageScrollPhysics(),
                    scrollDirection: Axis.horizontal,
                    children: List.generate(
                      20,
                      (index) => MainStat(
                        width: constraints.maxWidth / 3,
                        category: '미세먼지',
                        imgPath: 'asset/img/best.png',
                        level: '최고',
                        stat: '0㎍/㎥',
                      ),
                    ),
                  ),
                )
              ],
            );
          }),
        ));
  }
}
