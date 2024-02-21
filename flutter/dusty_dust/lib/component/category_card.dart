import 'package:dusty_dust/component/main_stat.dart';
import 'package:dusty_dust/const/colors.dart';
import 'package:flutter/material.dart';

class CategoryCard extends StatelessWidget {
  const CategoryCard({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 160,
      child: Card(
        margin: const EdgeInsets.symmetric(
          horizontal: 8.0,
        ),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(
              16.0,
            ),
          ),
        ),
        color: lightColor,
        child: LayoutBuilder(builder: (context, constraints) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                decoration: const BoxDecoration(
                  color: darkColor,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(16.0),
                    topRight: Radius.circular(16.0),
                  ),
                ),
                child: const Padding(
                  padding: EdgeInsets.all(4.0),
                  child: Text(
                    '종류별 통계',
                    style: TextStyle(
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
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
      ),
    );
  }
}
