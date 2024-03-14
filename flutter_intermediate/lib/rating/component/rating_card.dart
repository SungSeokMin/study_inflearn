import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/const/colors.dart';
import 'package:collection/collection.dart';
import 'package:flutter_intermediate/rating/model/rating_model.dart';

class RatingCard extends StatelessWidget {
  // CircleAvatar
  final ImageProvider avatarimage;
  // 이미지 리스트 (가로 스크롤)
  final List<Image> images;
  // 별점
  final int rating;
  // 이메일
  final String email;
  // 리뷰 내용
  final String content;

  const RatingCard({
    super.key,
    required this.avatarimage,
    required this.images,
    required this.rating,
    required this.email,
    required this.content,
  });

  factory RatingCard.fromModel({required RatingModel model}) {
    return RatingCard(
      avatarimage: NetworkImage(model.user.imageUrl),
      images: model.imgUrls.map((img) => Image.network(img)).toList(),
      rating: model.rating,
      email: model.user.username,
      content: model.content,
    );
  }

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
        const SizedBox(height: 8.0),
        _Body(
          content: content,
        ),
        const SizedBox(height: 4.0),
        if (images.isNotEmpty)
          SizedBox(
            height: 100,
            child: _Images(
              images: images,
            ),
          ),
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
  final String content;

  const _Body({
    required this.content,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Flexible(
          child: Text(
            content,
            style: const TextStyle(
              color: bodyTextColor,
              fontSize: 14.0,
            ),
          ),
        ),
      ],
    );
  }
}

class _Images extends StatelessWidget {
  final List<Image> images;

  const _Images({
    required this.images,
  });

  @override
  Widget build(BuildContext context) {
    return ListView(
      scrollDirection: Axis.horizontal,
      children: images
          .mapIndexed(
            (index, image) => Padding(
              padding: EdgeInsets.only(right: index == images.length - 1 ? 0 : 16.0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8.0),
                child: image,
              ),
            ),
          )
          .toList(),
    );
  }
}
