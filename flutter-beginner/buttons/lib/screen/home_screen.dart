import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('버튼'),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ElevatedButton(
              onPressed: () {},
              style: ButtonStyle(
                // Material State
                // hovered - 마우스 커서를 올려놓은 상태
                // focused - 포커스 됐을 때 (텍스트 필드)
                // pressed - 눌렸을 때
                // dragged - 드래그 됐을 때
                // selected - 선택됐을 때
                // scrollUnder - 다른 컴포넌트 밑으로 스크롤링 됐을 때
                // disabled - 비활성화 됐을 때
                backgroundColor: MaterialStateProperty.resolveWith((states) {
                  if (states.contains(MaterialState.pressed)) {
                    return Colors.black;
                  }

                  return Colors.white;
                }),
                foregroundColor: MaterialStateProperty.resolveWith((states) {
                  if (states.contains(MaterialState.pressed)) {
                    return Colors.white;
                  }

                  return Colors.red;
                }),
              ),
              child: const Text('Button Style'),
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red, // 메인 칼라
                  foregroundColor: Colors.white, // 글자 및 애니메이션 색깔
                  shadowColor: Colors.green, // 그림자 색깔
                  elevation: 3.0, // 3D 입체감의 높이
                  textStyle: const TextStyle(fontWeight: FontWeight.bold),
                  padding: const EdgeInsets.symmetric(vertical: 12.0),
                  side: const BorderSide(
                    color: Colors.black,
                    width: 1.0,
                    style: BorderStyle.solid,
                  )),
              onPressed: () {},
              child: const Text('ElevatedButton'),
            ),
            OutlinedButton(
              onPressed: () {},
              style: OutlinedButton.styleFrom(
                backgroundColor: Colors.yellow,
                foregroundColor: Colors.green,
              ),
              child: const Text('OutlinedButton'),
            ),
            TextButton(
              onPressed: () {},
              style: TextButton.styleFrom(
                backgroundColor: Colors.blue,
                foregroundColor: Colors.brown,
              ),
              child: const Text('TextButton'),
            ),
          ],
        ),
      ),
    );
  }
}
