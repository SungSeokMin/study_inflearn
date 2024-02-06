import 'dart:math';

import 'package:flutter/material.dart';
import 'package:random_number/constant/color.dart';
import 'package:random_number/screen/settings_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int maxNumber = 1000;
  List<int> randomNumber = [123, 456, 789];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryColor,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _Header(onPressed: onSettingsPop),
              _Body(randomNumber: randomNumber),
              _Fotter(onPressed: onRandomNumberGenerate)
            ],
          ),
        ),
      ),
    );
  }

  void onRandomNumberGenerate() {
    final random = Random();
    final Set<int> newNumbers = {};

    while (newNumbers.length != 3) {
      final num = random.nextInt(maxNumber);

      newNumbers.add(num);
    }

    setState(() => randomNumber = newNumbers.toList());
  }

  void onSettingsPop() async {
    final result = await Navigator.of(context).push<int?>(
      MaterialPageRoute(builder: (BuildContext context) {
        return const SettingsScreen();
      }),
    );

    if (result != null) setState(() => maxNumber = result);
  }
}

class _Header extends StatelessWidget {
  final VoidCallback onPressed;

  const _Header({required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Text(
          '랜덤숫자 생성기',
          style: TextStyle(
            color: Colors.white,
            fontSize: 30.0,
            fontWeight: FontWeight.w700,
          ),
        ),
        IconButton(
            onPressed: onPressed,
            icon: const Icon(
              Icons.settings,
              color: redColor,
            )),
      ],
    );
  }
}

class _Body extends StatelessWidget {
  final List<int> randomNumber;

  const _Body({required this.randomNumber});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: randomNumber
            .asMap()
            .entries
            .map(
              (x) => Padding(
                padding: EdgeInsets.only(bottom: x.key == randomNumber.length - 1 ? 0 : 16.0),
                child: Row(
                  children: x.value
                      .toString()
                      .split('')
                      .map(
                        (x) => Image.asset(
                          'asset/img/$x.png',
                          width: 50.0,
                          height: 70.0,
                        ),
                      )
                      .toList(),
                ),
              ),
            )
            .toList(),
      ),
    );
  }
}

class _Fotter extends StatelessWidget {
  final VoidCallback onPressed;

  const _Fotter({required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: redColor,
        ),
        child: const Text(
          '생성하기',
          style: TextStyle(color: Colors.white),
        ),
      ),
    );
  }
}
