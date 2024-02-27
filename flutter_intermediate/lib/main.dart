import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/component/custom_text_form_filed.dart';

void main() {
  return runApp(
    const _App(),
  );
}

class _App extends StatelessWidget {
  const _App();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Colors.white,
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomTextFormField(
              hintText: '이메일을 입력해주세요',
              onChanged: (value) {},
            ),
            CustomTextFormField(
              obscureText: true,
              hintText: '이메일을 입력해주세요',
              onChanged: (value) {},
            ),
          ],
        ),
      ),
    );
  }
}
