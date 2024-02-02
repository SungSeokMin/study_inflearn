import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class HomeScreen extends StatelessWidget {
  WebViewController controller = WebViewController();

  HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Code Factory'),
          centerTitle: true,
          backgroundColor: Colors.orange,
        ),
        body: WebViewWidget(controller: controller));
  }
}
