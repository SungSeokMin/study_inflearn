import 'package:flutter/material.dart';
import 'package:random_number/component/number_row.dart';
import 'package:random_number/constant/color.dart';

class SettingsScreen extends StatefulWidget {
  final int maxNumber;

  const SettingsScreen({super.key, required this.maxNumber});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  double maxNumber = 1000;

  @override
  void initState() {
    super.initState();

    maxNumber = widget.maxNumber.toDouble();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: primaryColor,
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              children: [
                _Body(maxNumber: maxNumber),
                _Footer(
                    maxNumber: maxNumber,
                    onSlideChanged: onSlideChanged,
                    onButtonPressed: onButtonPressed)
              ],
            ),
          ),
        ));
  }

  void onSlideChanged(double value) {
    setState(() => maxNumber = value);
  }

  void onButtonPressed() {
    Navigator.of(context).pop(maxNumber.toInt());
  }
}

class _Body extends StatelessWidget {
  final double maxNumber;

  const _Body({required this.maxNumber});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: NumberRow(number: maxNumber.toInt()),
    );
  }
}

class _Footer extends StatelessWidget {
  final double maxNumber;
  final ValueChanged<double>? onSlideChanged;
  final VoidCallback onButtonPressed;

  const _Footer(
      {required this.maxNumber, required this.onSlideChanged, required this.onButtonPressed});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Slider(
          value: maxNumber,
          min: 1000,
          max: 1000 * 100,
          onChanged: onSlideChanged,
        ),
        ElevatedButton(
          onPressed: onButtonPressed,
          style: ElevatedButton.styleFrom(backgroundColor: redColor),
          child: const Text(
            '저장',
            style: TextStyle(color: Colors.white),
          ),
        )
      ],
    );
  }
}
