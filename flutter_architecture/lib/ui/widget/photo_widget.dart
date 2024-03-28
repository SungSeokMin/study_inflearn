import 'package:flutter/material.dart';
import 'package:flutter_architecture/model/photo_model.dart';

// 변수를 사용하지 않고 위젯만 사용한 경우 const를 집어넣는다.
// 재사용이 가능하며, 메모리를 아낄 수 있다.
class PhotoWidget extends StatelessWidget {
  final Photo photo;

  const PhotoWidget({
    super.key,
    required this.photo,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: NetworkImage(photo.previewURL),
          fit: BoxFit.cover,
        ),
        borderRadius: const BorderRadius.all(
          Radius.circular(16.0),
        ),
      ),
    );
  }
}
