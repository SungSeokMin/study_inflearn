import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  DateTime selectedDate = DateTime(
    DateTime.now().year,
    DateTime.now().month,
    DateTime.now().day,
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.pink[100],
      body: SafeArea(
        bottom: false,
        child: SizedBox(
          width: MediaQuery.of(context).size.width,
          child: Column(
            children: [
              _TopPart(
                selectedDate: selectedDate,
                onPressed: onPressed,
              ),
              const _BottomPart(),
            ],
          ),
        ),
      ),
    );
  }

  void onPressed() {
    final DateTime now = DateTime.now();
    // dialog
    showCupertinoDialog(
        context: context,
        barrierDismissible: true,
        builder: (BuildContext context) {
          return Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              color: Colors.white,
              height: 300.0,
              child: CupertinoDatePicker(
                  mode: CupertinoDatePickerMode.date,
                  initialDateTime: selectedDate,
                  maximumDate: DateTime(now.year, now.month, now.day),
                  onDateTimeChanged: (DateTime date) {
                    setState(() => selectedDate = date);
                  }),
            ),
          );
        });
  }
}

class _TopPart extends StatelessWidget {
  final DateTime selectedDate;
  final VoidCallback onPressed;

  const _TopPart({required this.selectedDate, required this.onPressed, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final now = DateTime.now();

    return Expanded(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Text('U*I', style: textTheme.displayLarge),
          Column(children: [
            Text('우리 처음 만난 날', style: textTheme.bodyLarge),
            Text('${selectedDate.year}.${selectedDate.month}.${selectedDate.day}',
                style: textTheme.bodyMedium)
          ]),
          IconButton(
            onPressed: onPressed,
            icon: const Icon(
              Icons.favorite,
              color: Colors.red,
            ),
            iconSize: 60.0,
          ),
          Text('D+${DateTime(now.year, now.month, now.day).difference(selectedDate).inDays + 1}',
              style: textTheme.displayMedium),
        ],
      ),
    );
  }
}

class _BottomPart extends StatelessWidget {
  const _BottomPart();

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Image.asset(
        'asset/img/middle_image.png',
      ),
    );
  }
}
