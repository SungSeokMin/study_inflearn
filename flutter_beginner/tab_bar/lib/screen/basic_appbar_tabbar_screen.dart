import 'package:flutter/material.dart';
import 'package:tab_bar/const/tabs.dart';

class BasicAppbarTabbarScreen extends StatelessWidget {
  const BasicAppbarTabbarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: TABS.length,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('BasicAppBarScreen'),
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(80),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                TabBar(
                  indicatorColor: Colors.red,
                  indicatorWeight: 4.0,
                  indicatorSize: TabBarIndicatorSize.tab,
                  // isScrollable: true,
                  labelColor: Colors.green,
                  unselectedLabelColor: Colors.grey,
                  labelStyle: const TextStyle(
                    fontWeight: FontWeight.w700,
                  ),
                  unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w400),
                  tabs: TABS
                      .map(
                        (tab) => Tab(
                          icon: Icon(tab.icon),
                          child: Text(tab.label),
                        ),
                      )
                      .toList(),
                )
              ],
            ),
          ),
        ),
        body: TabBarView(
          children: TABS
              .map(
                (tab) => Center(
                  child: Icon(tab.icon),
                ),
              )
              .toList(),
        ),
      ),
    );
  }
}
