import 'package:calendar_scheduler/const/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CustomTextField extends StatelessWidget {
  final String label;
  final bool isTime;

  const CustomTextField({
    super.key,
    required this.label,
    required this.isTime,
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
        isTime
            ? renderTextField()
            : Expanded(
                child: renderTextField(),
              )
      ],
    );
  }

  Widget renderTextField() {
    return TextFormField(
      validator: (String? val) {
        if (val == null || val.isEmpty) return '값을 입력해주세요.';

        if (isTime) {
          int time = int.parse(val);

          if (time < 0) return '0 이상의 숫자를 입력해주세요.';
          if (time > 24) return '24 이하의 숫자를 입력해주세요.';
        }

        return null;
      },
      expands: !isTime,
      keyboardType: isTime ? TextInputType.number : TextInputType.multiline,
      maxLines: isTime ? 1 : null,
      inputFormatters: isTime
          ? [
              FilteringTextInputFormatter.digitsOnly,
            ]
          : [],
      cursorColor: Colors.grey,
      decoration: InputDecoration(
        filled: true,
        fillColor: Colors.grey[300],
        border: InputBorder.none,
      ),
    );
  }
}
