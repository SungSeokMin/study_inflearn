import 'package:dusty_dust/component/category_card.dart';
import 'package:dusty_dust/component/hourly_card.dart';
import 'package:dusty_dust/component/main_app_bar.dart';
import 'package:dusty_dust/component/main_drawer.dart';
import 'package:dusty_dust/const/colors.dart';
import 'package:dusty_dust/const/status_level.dart';
import 'package:dusty_dust/model/stat_model.dart';
import 'package:dusty_dust/repository/stat_repository.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  Future<List<StatModel>> fetchData() async {
    final statModels = await StatRepository.fetchData();

    return statModels;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryColor,
      drawer: const MainDrawer(),
      body: FutureBuilder<List<StatModel>>(
          future: fetchData(),
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return const Center(
                child: Text(
                  '에러가 있습니다.',
                ),
              );
            }

            List<StatModel> stats = snapshot.data!;
            StatModel recentStat = stats[0];

            final status = statusLevel
                .where(
                  (element) => element.minFineDust < recentStat.seoul,
                )
                .last;

            return CustomScrollView(
              slivers: [
                MainAppBar(
                  stat: recentStat,
                  status: status,
                ),
                const SliverToBoxAdapter(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      CategoryCard(),
                      SizedBox(
                        height: 16.0,
                      ),
                      HourlyCard(),
                    ],
                  ),
                )
              ],
            );
          }),
    );
  }
}
