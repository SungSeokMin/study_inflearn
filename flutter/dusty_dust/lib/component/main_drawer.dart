import 'package:dusty_dust/const/colors.dart';
import 'package:dusty_dust/const/regions.dart';
import 'package:flutter/material.dart';

typedef OnRegionTap = void Function(String region);

class MainDrawer extends StatelessWidget {
  final String selectedRegion;
  final OnRegionTap onRegionTap;

  const MainDrawer({
    super.key,
    required this.selectedRegion,
    required this.onRegionTap,
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: darkColor,
      child: ListView(
        children: [
          const DrawerHeader(
            child: Text(
              '지역 선택',
              style: TextStyle(
                color: Colors.white,
                fontSize: 20.0,
              ),
            ),
          ),
          ...regions.map(
            (region) => ListTile(
              tileColor: Colors.white,
              selectedTileColor: lightColor,
              selectedColor: Colors.black,
              selected: region == selectedRegion,
              title: Text(region),
              onTap: () {
                onRegionTap(region);
              },
            ),
          ),
        ],
      ),
    );
  }
}
