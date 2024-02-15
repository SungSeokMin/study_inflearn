import 'package:drift/drift.dart';

class CategoryColor extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get hexCode => text()();
}
