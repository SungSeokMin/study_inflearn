import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/const/colors.dart';
import 'package:flutter_intermediate/common/layout/default_layout.dart';
import 'package:flutter_intermediate/product/view/product_screen.dart';
import 'package:flutter_intermediate/restaurant/view/basket_screen.dart';
import 'package:flutter_intermediate/restaurant/view/restaurant_screen.dart';
import 'package:flutter_intermediate/user/view/profile_screen.dart';

class RootTab extends StatefulWidget {
  static String get routeName => 'home';

  const RootTab({super.key});

  @override
  State<RootTab> createState() => _RootTabState();
}

class _RootTabState extends State<RootTab> with SingleTickerProviderStateMixin {
  late TabController controller;

  int index = 0;

  @override
  void initState() {
    super.initState();

    controller = TabController(length: 4, vsync: this);
    controller.addListener(tabListner);
  }

  @override
  void dispose() {
    controller.removeListener(tabListner);

    super.dispose();
  }

  void tabListner() {
    setState(() {
      index = controller.index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return DefaultLayout(
      title: '코팩 딜리버리',
      bottomNavigationBar: BottomNavigationBar(
        selectedItemColor: primaryColor,
        selectedFontSize: 10.0,
        unselectedItemColor: bodyTextColor,
        unselectedFontSize: 10.0,
        type: BottomNavigationBarType.fixed,
        onTap: (int index) {
          controller.animateTo(index);
        },
        currentIndex: index,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined), label: '홈'),
          BottomNavigationBarItem(icon: Icon(Icons.fastfood_outlined), label: '음식'),
          BottomNavigationBarItem(icon: Icon(Icons.receipt_long_outlined), label: '주문'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outlined), label: '프로필'),
        ],
      ),
      child: TabBarView(
        physics: const NeverScrollableScrollPhysics(),
        controller: controller,
        children: const [
          RestaurantScreen(),
          ProductScreen(),
          BasketScreen(),
          ProfileScreen(),
        ],
      ),
    );
  }
}
