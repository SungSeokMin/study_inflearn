import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/const/colors.dart';

class RatingCard extends StatelessWidget {
  // CircleAvatar
  final ImageProvider avatarimage;
  // 이미지 리스트 (가로 스크롤)
  final List<Image> images;
  // 별점
  final int rating;
  // 이메일
  final String email;
  // 리뷰 ㅐㄴ용
  final String content;

  const RatingCard({
    super.key,
    required this.avatarimage,
    required this.images,
    required this.rating,
    required this.email,
    required this.content,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _Header(
          avatarimage: avatarimage,
          email: email,
          rating: rating,
        ),
        const _Body(),
        const _Images(),
      ],
    );
  }
}

class _Header extends StatelessWidget {
  final ImageProvider avatarimage;
  final String email;
  final int rating;

  const _Header({
    required this.avatarimage,
    required this.email,
    required this.rating,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        CircleAvatar(
          radius: 12.0,
          backgroundImage: avatarimage,
        ),
        const SizedBox(width: 8.0),
        Expanded(
          child: Text(
            email,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              fontSize: 14.0,
              color: Colors.black,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
        ...List.generate(
          5,
          (index) => Icon(
            index < rating ? Icons.star : Icons.star_border_outlined,
            color: primaryColor,
            size: 14.0,
          ),
        ),
      ],
    );
  }
}

class _Body extends StatelessWidget {
  const _Body({super.key});

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

class _Images extends StatelessWidget {
  const _Images({super.key});

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
