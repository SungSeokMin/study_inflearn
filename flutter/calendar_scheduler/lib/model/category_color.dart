import 'package:drift/drift.dart';

class CategoryColor extends Table {
  IntColumn get id => integer()();
  TextColumn get hexCode => text()();
}
