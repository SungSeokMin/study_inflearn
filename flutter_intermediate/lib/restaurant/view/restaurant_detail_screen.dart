import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/layout/default_layout.dart';
import 'package:flutter_intermediate/product/component/product_card.dart';
import 'package:flutter_intermediate/restaurant/component/restaurant_card.dart';

class RestaurantDetailScreen extends StatelessWidget {
  const RestaurantDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultLayout(
      title: '불타는 떡볶이',
      child: Column(
        children: [
          RestaurantCard(
            image: Image.asset('asset/img/food/ddeok_bok_gi.jpg'),
            name: '떡볶이',
            tags: const ['맛있는', '매콤한'],
            ratings: 10,
            ratingsCount: 2,
            deliveryTime: 15,
            deliveryFee: 22,
            isDetail: true,
            detail: '맛있는 떡볶이',
          ),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            child: ProductCard(),
          ),
        ],
      ),
    );
  }
}
