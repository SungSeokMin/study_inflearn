import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_intermediate/common/const/colors.dart';
import 'package:flutter_intermediate/restaurant/model/restaurant_detail_model.dart';

class ProductCard extends StatelessWidget {
  final Image image;
  final String name;
  final String detail;
  final int price;

  const ProductCard({
    super.key,
    required this.image,
    required this.name,
    required this.detail,
    required this.price,
  });

  factory ProductCard.fromModel({required RestaurantProductModel model}) {
    return ProductCard(
      image: Image.network(
        model.imgUrl,
        width: 110,
        height: 110,
        fit: BoxFit.cover,
      ),
      name: model.name,
      detail: model.detail,
      price: model.price,
    );
  }

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8.0),
            child: image,
          ),
          const SizedBox(width: 16.0),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  name,
                  style: const TextStyle(fontSize: 18.0, fontWeight: FontWeight.w500),
                ),
                Text(
                  detail,
                  style: const TextStyle(
                    fontSize: 14.0,
                    color: bodyTextColor,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                Text(
                  '₩${price.toString()}',
                  style: const TextStyle(
                    fontSize: 12.0,
                    fontWeight: FontWeight.w500,
                    color: primaryColor,
                  ),
                  textAlign: TextAlign.end,
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
