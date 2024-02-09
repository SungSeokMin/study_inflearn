import 'package:flutter/material.dart';
import 'package:navigation/layout/main_layout.dart';
import 'package:navigation/screen/route_three_screen.dart';

class RouteTwoScreen extends StatelessWidget {
  const RouteTwoScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final argument = ModalRoute.of(context)!.settings.arguments;

    return MainLayout(
      title: 'Route Two Screen',
      children: [
        Text(argument.toString()),
        ElevatedButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text('Pop'),
        ),
        ElevatedButton(
          onPressed: () {
            Navigator.of(context).pushNamed('/three', arguments: 999);
          },
          child: const Text('Push Named'),
        ),
        ElevatedButton(
          onPressed: () {
            // 현재 페이지를 stack에 쌓지 않는다.
            Navigator.of(context).pushReplacement(MaterialPageRoute(
              builder: (_) => const RouteThreeScreen(),
            ));
          },
          child: const Text('PushReplacement'),
        ),
        ElevatedButton(
          onPressed: () {
            Navigator.of(context).pushReplacementNamed('/three');
          },
          child: const Text('PushReplacementNamed'),
        ),
        ElevatedButton(
          onPressed: () {
            Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(
                  builder: (_) => const RouteThreeScreen(),
                ),
                (route) => route.settings.name == '/');
          },
          child: const Text('PushAndRemoveUntil'),
        ),
        ElevatedButton(
            onPressed: () {
              Navigator.of(context).pushNamedAndRemoveUntil(
                '/three',
                (route) => route.settings.name == '/',
              );
            },
            child: const Text('PushNamedAndRemoveUntil'))
      ],
    );
  }
}
