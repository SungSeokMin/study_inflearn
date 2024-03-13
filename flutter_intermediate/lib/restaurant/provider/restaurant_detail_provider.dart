import 'package:flutter_intermediate/common/model/cursor_pagination_model.dart';
import 'package:flutter_intermediate/restaurant/model/restaurant_model.dart';
import 'package:flutter_intermediate/restaurant/provider/restaurant_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final restaurantDetailProvider = Provider.family<RestaurantModel?, String>((ref, String id) {
  final state = ref.watch(restaurantProvier);

  if (state is! CursorPagination<RestaurantModel>) return null;

  return state.data.firstWhere((element) => element.id == id);
});
