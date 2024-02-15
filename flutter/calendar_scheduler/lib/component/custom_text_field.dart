import 'package:calendar_scheduler/const/colors.dart';
import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final String label;

  const CustomTextField({
    super.key,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            color: primaryColor,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(
          height: 6.0,
        ),
        TextField(
          cursorColor: Colors.grey,
          decoration: InputDecoration(
            filled: true,
            fillColor: Colors.grey[300],
            border: InputBorder.none,
          ),
        ),
      ],
    );
  }
}
