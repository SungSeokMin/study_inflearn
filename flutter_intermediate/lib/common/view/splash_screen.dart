import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/const/colors.dart';
import 'package:flutter_intermediate/common/layout/default_layout.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SplashScreen extends ConsumerWidget {
  const SplashScreen({super.key});

  static String get routeName => 'splash';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return DefaultLayout(
      backgroundColor: primaryColor,
      child: SizedBox(
        width: MediaQuery.of(context).size.width,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'asset/img/logo/logo.png',
              width: MediaQuery.of(context).size.width / 2,
            ),
            const SizedBox(
              height: 16.0,
            ),
            const CircularProgressIndicator(
              color: Colors.white,
            )
          ],
        ),
      ),
    );
  }
}
