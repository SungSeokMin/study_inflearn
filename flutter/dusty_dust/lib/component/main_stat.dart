import 'package:flutter/material.dart';

class MainStat extends StatelessWidget {
  final String category;
  final String imgPath;
  final String level;
  final String stat;

  const MainStat({
    super.key,
    required this.category,
    required this.imgPath,
    required this.level,
    required this.stat,
  });

  @override
  Widget build(BuildContext context) {
    const ts = TextStyle(
      color: Colors.black,
    );

    return Column(
      children: [
        Text(
          category,
          style: ts,
        ),
        const SizedBox(
          height: 8.0,
        ),
        Image.asset(
          imgPath,
          width: 50.0,
        ),
        const SizedBox(
          height: 8.0,
        ),
        Text(
          level,
          style: ts,
        ),
        Text(
          stat,
          style: ts,
        ),
      ],
    );
  }
}
