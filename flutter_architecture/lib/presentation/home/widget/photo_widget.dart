import 'package:flutter/material.dart';
import 'package:flutter_architecture/domain/model/photo.dart';

class PhotoWidget extends StatelessWidget {
  final Photo photo;

  const PhotoWidget({
    required this.photo,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: const BorderRadius.all(
          Radius.circular(16),
        ),
        image: DecorationImage(
          image: NetworkImage(
            photo.previewURL,
          ),
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
