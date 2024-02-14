import 'package:calendar_scheduler/const/colors.dart';
import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

class Calendar extends StatelessWidget {
  final DateTime selectedDay;
  final DateTime focusedDay;
  final OnDaySelected? onDaySelected;

  const Calendar({
    super.key,
    required this.selectedDay,
    required this.focusedDay,
    required this.onDaySelected,
  });

  @override
  Widget build(BuildContext context) {
    final defaultBoxDeco = BoxDecoration(
      borderRadius: BorderRadius.circular(6.0),
      color: Colors.grey[200],
    );

    final defaultTextStyle = TextStyle(
      color: Colors.grey[600],
      fontWeight: FontWeight.w700,
    );

    return TableCalendar(
      locale: 'ko_KR',
      focusedDay: focusedDay,
      firstDay: DateTime(1800),
      lastDay: DateTime(3000),
      headerStyle: const HeaderStyle(
        formatButtonVisible: false,
        titleCentered: true,
        titleTextStyle: TextStyle(fontWeight: FontWeight.w700, fontSize: 16.0),
      ),
      calendarStyle: CalendarStyle(
        isTodayHighlighted: false,
        defaultDecoration: defaultBoxDeco,
        defaultTextStyle: defaultTextStyle,
        weekendDecoration: defaultBoxDeco,
        weekendTextStyle: defaultTextStyle,
        selectedDecoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(6.0),
          border: Border.all(
            color: primaryColor,
            width: 1.0,
          ),
        ),
        selectedTextStyle: defaultTextStyle.copyWith(
          color: primaryColor,
        ),
        outsideDecoration: const BoxDecoration(
          shape: BoxShape.rectangle,
        ),
      ),
      onDaySelected: onDaySelected,
      selectedDayPredicate: (day) {
        bool sameYear = day.year == selectedDay.year;
        bool sameMonth = day.month == selectedDay.month;
        bool sameDay = day.day == selectedDay.day;

        return sameYear && sameMonth && sameDay;
      },
    );
  }
}
