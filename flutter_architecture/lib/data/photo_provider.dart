import 'package:flutter/material.dart';
import 'package:flutter_architecture/ui/home_view_model.dart';

class PhotoProvider extends InheritedWidget {
  final HomeViewModel viewModel;

  const PhotoProvider({
    required this.viewModel,
    required super.child,
    super.key,
  });

  static PhotoProvider of(BuildContext context) {
    final PhotoProvider? result = context.dependOnInheritedWidgetOfExactType<PhotoProvider>();

    assert(result != null, 'No PixabayApi found in context');

    return result!;
  }

  @override
  bool updateShouldNotify(PhotoProvider oldWidget) {
    return true;
  }
}
