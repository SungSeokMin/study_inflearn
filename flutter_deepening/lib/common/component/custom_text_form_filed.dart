import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/const/colors.dart';

class CustomTextFormField extends StatelessWidget {
  final bool obscureText;
  final bool autofocus;
  final String? hintText;
  final String? errorText;
  final ValueChanged<String>? onChanged;

  const CustomTextFormField({
    super.key,
    required this.onChanged,
    this.obscureText = false,
    this.autofocus = false,
    this.hintText,
    this.errorText,
  });

  @override
  Widget build(BuildContext context) {
    const baseBorder = OutlineInputBorder(
      borderSide: BorderSide(
        width: 1.0,
        color: inputBorderColor,
      ),
    );

    return TextFormField(
      cursorColor: primaryColor,
      // 비밀번호 입력할때 사용 -> ****
      obscureText: obscureText,
      autofocus: autofocus,
      onChanged: onChanged,
      decoration: InputDecoration(
        contentPadding: const EdgeInsets.all(20.0),
        hintText: hintText,
        hintStyle: const TextStyle(
          fontSize: 14.0,
          color: bodyTextColor,
        ),
        errorText: errorText,
        // true - 배경색 있음, false - 배경색 없음
        filled: true,
        fillColor: inputBgColor,
        // 모든 input 상태의 스타일
        border: baseBorder,
        // 선택되지 않은 input 상태의 스타일
        enabledBorder: baseBorder,
        // 선택된 input 상태의 스타일
        focusedBorder: baseBorder.copyWith(
          borderSide: baseBorder.borderSide.copyWith(
            color: primaryColor,
          ),
        ),
      ),
    );
  }
}
