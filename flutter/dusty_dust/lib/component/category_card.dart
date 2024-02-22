import 'package:dusty_dust/component/card_title.dart';
import 'package:dusty_dust/component/main_card.dart';
import 'package:dusty_dust/component/main_stat.dart';
import 'package:dusty_dust/model/stat_and_status_model.dart';
import 'package:dusty_dust/utils/data_utils.dart';

import 'package:flutter/material.dart';

class CategoryCard extends StatelessWidget {
  final String region;
  final List<StatAndStatusModel> models;

  const CategoryCard({
    super.key,
    required this.region,
    required this.models,
  });

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
