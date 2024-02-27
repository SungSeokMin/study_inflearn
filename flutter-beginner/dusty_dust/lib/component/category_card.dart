import 'package:dusty_dust/component/card_title.dart';
import 'package:dusty_dust/component/main_card.dart';
import 'package:dusty_dust/component/main_stat.dart';

import 'package:dusty_dust/model/stat_and_status_model.dart';
import 'package:dusty_dust/utils/data_utils.dart';

import 'package:flutter/material.dart';

class CategoryCard extends StatelessWidget {
  final String region;
  final Color darkColor;
  final Color lightColor;
  final List<StatAndStatusModel> models;

  const CategoryCard({
    super.key,
    required this.region,
    required this.darkColor,
    required this.lightColor,
    required this.models,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 160,
        child: MainCard(
          backgroundColor: lightColor,
          child: LayoutBuilder(builder: (context, constraints) {
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                CardTitle(
                  title: '종류별 통계',
                  backgroundColor: darkColor,
                ),
                Expanded(
                  child: ListView(
                      physics: const PageScrollPhysics(),
                      scrollDirection: Axis.horizontal,
                      children: models
                          .map(
                            (model) => MainStat(
                              width: constraints.maxWidth / 3,
                              category: DataUtils.getItemCodeKrString(
                                itemCode: model.itemCode,
                              ),
                              imgPath: model.status.imagePath,
                              level: model.status.label,
                              stat:
                                  '${model.stat.getLevelFromRegion(region)}${DataUtils.getUnitFromItemCode(
                                itemCode: model.itemCode,
                              )}',
                            ),
                          )
                          .toList()),
                )
              ],
            );
          }),
        ));
  }
}
