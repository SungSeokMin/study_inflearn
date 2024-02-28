import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/const/colors.dart';

class RestaurantCard extends StatelessWidget {
  final Widget image;
  final String name;
  final List<String> tags;
  final double rating;
  final int ratingCount;
  final int deliveryTime;
  final int deliveryFee;

  const RestaurantCard({
    super.key,
    required this.image,
    required this.name,
    required this.tags,
    required this.rating,
    required this.ratingCount,
    required this.deliveryTime,
    required this.deliveryFee,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(12.0),
          child: image,
        ),
        const SizedBox(height: 16.0),
        Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              name,
              style: const TextStyle(
                fontSize: 20.0,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 8.0),
            Text(
              tags.join(' · '),
              style: const TextStyle(
                fontSize: 14.0,
                color: bodyTextColor,
              ),
            )
          ],
        ),
        const SizedBox(height: 8.0),
        Row(
          children: [
            _IconText(
              icon: Icons.star,
              label: rating.toString(),
              dot: true,
            ),
            _IconText(
              icon: Icons.receipt,
              label: ratingCount.toString(),
              dot: true,
            ),
            _IconText(
              icon: Icons.timelapse_outlined,
              label: '$deliveryTime분',
              dot: true,
            ),
            _IconText(
              icon: Icons.monetization_on,
              label: deliveryFee == 0 ? '무료' : deliveryTime.toString(),
            ),
          ],
        )
      ],
    );
  }
}

class _IconText extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool? dot;

  const _IconText({
    required this.icon,
    required this.label,
    this.dot,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(
          icon,
          color: primaryColor,
          size: 14.0,
        ),
        const SizedBox(
          width: 8.0,
        ),
        Text(
          label,
          style: const TextStyle(
            fontSize: 12.0,
            fontWeight: FontWeight.w500,
          ),
        ),
        if (dot != null) renderDot()
      ],
    );
  }

  renderDot() {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.0),
      child: Text(
        ' · ',
        style: TextStyle(
          fontSize: 12.0,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
