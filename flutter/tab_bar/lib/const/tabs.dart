import 'package:flutter/material.dart';

class TabInfo {
  final IconData icon;
  final String labe;

  const TabInfo({
    required this.icon,
    required this.labe,
  });
}

const TABS = [
  TabInfo(icon: Icons.account_balance_outlined, labe: '지갑'),
  TabInfo(icon: Icons.alarm_add_outlined, labe: '알람'),
  TabInfo(icon: Icons.keyboard, labe: '키보드'),
  TabInfo(icon: Icons.ac_unit, labe: '온도'),
  TabInfo(icon: Icons.android, labe: '안드로이드'),
];
