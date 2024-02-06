import 'package:flutter/material.dart';
import 'package:random_number/constant/color.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  static const numbers = [123, 456, 789];
  final numbersMap = numbers.asMap().entries;

  List<Widget> showNumber() {
    return numbersMap
        .map(
          (x) => Padding(
            padding: EdgeInsets.only(bottom: x.key == numbers.length - 1 ? 0 : 16.0),
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
                  onPressed: () {},
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
