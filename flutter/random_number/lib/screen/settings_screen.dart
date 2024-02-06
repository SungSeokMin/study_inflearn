import 'package:flutter/material.dart';
import 'package:random_number/constant/color.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  double maxNumber = 10000;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: primaryColor,
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(
                  child: Row(
                    children: maxNumber
                        .toInt()
                        .toString()
                        .split('')
                        .map(
                          (x) => Image.asset('asset/img/$x.png', width: 50.0, height: 70.0),
                        )
                        .toList(),
                  ),
                ),
                Slider(
                    value: maxNumber,
                    min: 10000,
                    max: 10000 * 100,
                    onChanged: (double value) {
                      setState(() => maxNumber = value);
                    }),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(backgroundColor: redColor),
                  child: const Text(
                    '저장',
                    style: TextStyle(color: Colors.white),
                  ),
                )
              ],
            ),
          ),
        ));
  }
}
