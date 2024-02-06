import 'dart:math';

import 'package:flutter/material.dart';
import 'package:random_number/constant/color.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  static List<int> randonNumber = [123, 456, 789];

  List<Widget> showNumber() {
    return randonNumber
        .asMap()
        .entries
        .map(
          (x) => Padding(
            padding: EdgeInsets.only(bottom: x.key == randonNumber.length - 1 ? 0 : 16.0),
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
        .toList();
  }

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
              Row(
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
                      onPressed: () {},
                      icon: const Icon(
                        Icons.settings,
                        color: redColor,
                      )),
                ],
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: showNumber(),
                ),
              ),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    final random = Random();

                    final Set<int> newNumbers = {};

                    while (newNumbers.length != 3) {
                      final num = random.nextInt(1000);

                      newNumbers.add(num);
                    }

                    setState(() => randonNumber = newNumbers.toList());
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: redColor,
                  ),
                  child: const Text(
                    '생성하기',
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
