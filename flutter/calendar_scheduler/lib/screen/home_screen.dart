import 'package:calendar_scheduler/component/calendar.dart';
import 'package:calendar_scheduler/component/schedule_card.dart';
import 'package:calendar_scheduler/component/today_banner.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  DateTime selectedDay = DateTime(
    DateTime.now().year,
    DateTime.now().month,
    DateTime.now().day,
  );
  DateTime focusedDay = DateTime.now();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Calendar(
              selectedDay: selectedDay,
              focusedDay: focusedDay,
              onDaySelected: onDaySelected,
            ),
            const SizedBox(height: 8.0),
            TodayBanner(
              selectedDay: selectedDay,
              scheduleCount: 4,
            ),
            const SizedBox(height: 8.0),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: ListView.separated(
                  itemCount: 3,
                  separatorBuilder: (context, index) {
                    return const SizedBox(
                      height: 8.0,
                    );
                  },
                  itemBuilder: (context, index) {
                    return const ScheduleCard(
                      startTime: 12,
                      endTime: 14,
                      content: '프로그래밍 공부하기',
                      color: Colors.red,
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void onDaySelected(selectedDay, _) {
    setState(() {
      this.selectedDay = selectedDay;
      focusedDay = selectedDay;
    });
  }
}
