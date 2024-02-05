import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.pink[100],
      body: SafeArea(
        bottom: false,
        child: SizedBox(
          width: MediaQuery.of(context).size.width,
          child: const Column(
            children: [
              _TopPart(),
              _BottomPart(),
            ],
          ),
        ),
      ),
    );
  }
}

class _TopPart extends StatelessWidget {
  const _TopPart();

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          const Text('U*I',
              style: TextStyle(color: Colors.white, fontFamily: 'parisienne', fontSize: 80.0)),
          const Column(children: [
            Text('우리 처음 만난 날',
                style: TextStyle(color: Colors.white, fontFamily: 'sunflower', fontSize: 30.0)),
            Text('2021.12.27',
                style: TextStyle(color: Colors.white, fontFamily: 'sunflower', fontSize: 20.0)),
          ]),
          IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.favorite,
              color: Colors.red,
            ),
            iconSize: 60.0,
          ),
          const Text('D+1',
              style: TextStyle(
                  color: Colors.white,
                  fontFamily: 'sunflower',
                  fontWeight: FontWeight.w700,
                  fontSize: 50.0)),
        ],
      ),
    );
  }
}

class _BottomPart extends StatelessWidget {
  const _BottomPart();

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Image.asset(
        'asset/img/middle_image.png',
      ),
    );
  }
}
