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
          bottom: TabBar(
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
        body: const Column(
          children: [],
        ),
      ),
    );
  }
}
