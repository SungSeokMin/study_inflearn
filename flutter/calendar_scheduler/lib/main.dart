import 'package:calendar_scheduler/database/drift_database.dart';
import 'package:calendar_scheduler/screen/home_screen.dart';
import 'package:drift/drift.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:intl/date_symbol_data_local.dart';

const defaultColors = [
  'F44336',
  'FF9800',
  'FFEB3B',
  'FCAF50',
  '2196F3',
  '3F51B5',
  '9C27B0',
];

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await initializeDateFormatting();

  final database = LocalDatabase();
  GetIt.I.registerSingleton<LocalDatabase>(database);

  final colors = await database.getCategoryColors();
  if (colors.isEmpty) {
    for (String hexCode in defaultColors) {
      await database.createCategoryColor(CategoryColorCompanion(
        hexCode: Value(hexCode),
      ));
    }
  }

  return runApp(
    MaterialApp(
      theme: ThemeData(
        fontFamily: 'NotoSans',
      ),
      home: const HomeScreen(),
    ),
  );
}
