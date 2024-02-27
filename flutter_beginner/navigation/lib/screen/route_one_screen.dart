import 'package:flutter/material.dart';
import 'package:navigation/layout/main_layout.dart';
import 'package:navigation/screen/route_two_screen.dart';

class RouteOneScreen extends StatelessWidget {
  final int? number;

  const RouteOneScreen({super.key, this.number});

  @override
  Widget build(BuildContext context) {
    return MainLayout(title: 'Route One Screen', children: [
      ElevatedButton(
        onPressed: () {
          Navigator.of(context).pop();
        },
        child: const Text('Pop'),
      ),
      ElevatedButton(
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) {
                return const RouteTwoScreen();
              },
              settings: const RouteSettings(
                arguments: 789,
              ),
            ),
          );
        },
        child: const Text('Push'),
      )
    ]);
  }
}
