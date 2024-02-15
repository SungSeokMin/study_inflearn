import 'package:drift/drift.dart';

class Schedules extends Table {
  IntColumn get id => integer()();
  TextColumn get content => text()();
  DateTimeColumn get date => dateTime()();
  IntColumn get startTime => integer()();
  IntColumn get endTime => integer()();

  IntColumn get colorId => integer()();

  DateTimeColumn get createdAt => dateTime()();
}
