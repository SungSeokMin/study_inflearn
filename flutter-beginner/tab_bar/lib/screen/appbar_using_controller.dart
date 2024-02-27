import 'package:flutter/material.dart';
import 'package:tab_bar/const/tabs.dart';

class AppbarUsingController extends StatefulWidget {
  const AppbarUsingController({super.key});

  @override
  State<AppbarUsingController> createState() => _AppbarUsingControllerState();
}

class _AppbarUsingControllerState extends State<AppbarUsingController>
    with TickerProviderStateMixin {
  late final TabController tabController;

  @override
  void initState() {
    super.initState();

    tabController = TabController(
      length: TABS.length,
      vsync: this,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AppbarUsingController'),
        bottom: TabBar(
          controller: tabController,
          tabs: TABS
              .map(
                (tab) => Tab(
                  icon: Icon(tab.icon),
                  child: Text(tab.label),
                ),
              )
              .toList(),
        ),
      ),
      body: TabBarView(
        controller: tabController,
        children: TABS
            .map(
              (tab) => Center(
                child: Icon(tab.icon),
              ),
            )
            .toList(),
      ),
    );
  }
}
