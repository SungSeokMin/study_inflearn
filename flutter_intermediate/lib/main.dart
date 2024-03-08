import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/view/splash_screen.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  return runApp(
    const ProviderScope(child: _App()),
  );
}

class _App extends StatelessWidget {
  const _App();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        fontFamily: 'NotoSans',
      ),
      debugShowCheckedModeBanner: false,
      home: const SplashScreen(),
    );
  }
}
