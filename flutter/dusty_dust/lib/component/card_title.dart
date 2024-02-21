import 'package:dusty_dust/const/colors.dart';
import 'package:flutter/material.dart';

class CardTitle extends StatelessWidget {
  final String title;

  const CardTitle({
    super.key,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: darkColor,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(16.0),
          topRight: Radius.circular(16.0),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(4.0),
        child: Text(
          title,
          style: const TextStyle(
            color: Colors.white,
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
