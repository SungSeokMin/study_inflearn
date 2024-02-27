import 'package:dusty_dust/component/category_card.dart';
import 'package:dusty_dust/component/hourly_card.dart';
import 'package:dusty_dust/component/main_app_bar.dart';
import 'package:dusty_dust/component/main_drawer.dart';
import 'package:dusty_dust/const/regions.dart';
import 'package:dusty_dust/model/stat_and_status_model.dart';
import 'package:dusty_dust/model/stat_model.dart';
import 'package:dusty_dust/repository/stat_repository.dart';
import 'package:dusty_dust/utils/data_utils.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String region = regions[0];
  bool isExpanded = true;
  ScrollController scrollController = ScrollController();

  @override
  initState() {
    super.initState();

    scrollController.addListener(scrollListner);
  }

  @override
  dispose() {
    scrollController.removeListener(scrollListner);
    scrollController.dispose();

    super.dispose();
  }

  Future<Map<ItemCode, List<StatModel>>> fetchData() async {
    Map<ItemCode, List<StatModel>> stats = {};

    List<Future> futures = [];

    for (ItemCode itemCode in ItemCode.values) {
      futures.add(StatRepository.fetchData(itemCode: itemCode));
    }

    final results = await Future.wait(futures);

    for (int i = 0; i < results.length; i++) {
      final key = ItemCode.values[i];
      final value = results[i];

      stats.addAll({key: value});
    }

    return stats;
  }

  void onRegionTap(String region) {
    setState(() {
      this.region = region;
    });

    Navigator.of(context).pop();
  }

  scrollListner() {
    bool isExpanded = scrollController.offset < 500 - kToolbarHeight;

    if (isExpanded != this.isExpanded) {
      setState(() {
        this.isExpanded = isExpanded;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<ItemCode, List<StatModel>>>(
        future: fetchData(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return const Scaffold(
              body: Center(
                child: Text(
                  '에러가 있습니다.',
                ),
              ),
            );
          }

          if (!snapshot.hasData) {
            return const Scaffold(
              body: Center(
                child: CircularProgressIndicator(),
              ),
            );
          }

          Map<ItemCode, List<StatModel>> stats = snapshot.data!;
          StatModel pm10RecentStat = stats[ItemCode.PM10]![0];

          final status = DataUtils.getStatusFromItemCodeAndValue(
              value: pm10RecentStat.seoul, itemCode: ItemCode.PM10);

          final ssModel = stats.keys.map((key) {
            final value = stats[key]!;
            final stat = value[0];

            return StatAndStatusModel(
              itemCode: key,
              status: DataUtils.getStatusFromItemCodeAndValue(
                value: stat.getLevelFromRegion(region),
                itemCode: key,
              ),
              stat: stat,
            );
          }).toList();

          return Scaffold(
            drawer: MainDrawer(
              selectedRegion: region,
              darkColor: status.darkColor,
              lightColor: status.lightColor,
              onRegionTap: onRegionTap,
            ),
            body: Container(
              color: status.primaryColor,
              child: CustomScrollView(
                controller: scrollController,
                slivers: [
                  MainAppBar(
                    region: region,
                    stat: pm10RecentStat,
                    status: status,
                    dateTime: pm10RecentStat.dataTime,
                    isExpanded: isExpanded,
                  ),
                  SliverToBoxAdapter(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        CategoryCard(
                          region: region,
                          darkColor: status.darkColor,
                          lightColor: status.lightColor,
                          models: ssModel,
                        ),
                        const SizedBox(
                          height: 16.0,
                        ),
                        ...stats.keys.map(
                          (itemCode) {
                            final stat = stats[itemCode]!;

                            return Padding(
                              padding: const EdgeInsets.only(bottom: 16.0),
                              child: HourlyCard(
                                region: region,
                                stats: stat,
                                category: DataUtils.getItemCodeKrString(itemCode: itemCode),
                                darkColor: status.darkColor,
                                lightColor: status.lightColor,
                              ),
                            );
                          },
                        ),
                        const SizedBox(
                          height: 16.0,
                        ),
                      ],
                    ),
                  )
                ],
              ),
            ),
          );
        });
  }
}