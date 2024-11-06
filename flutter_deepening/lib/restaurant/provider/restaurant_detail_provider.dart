import 'package:flutter_intermediate/common/model/cursor_pagination_model.dart';
import 'package:flutter_intermediate/restaurant/model/restaurant_model.dart';
import 'package:flutter_intermediate/restaurant/provider/restaurant_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:collection/collection.dart';

final restaurantDetailProvider = Provider.family<RestaurantModel?, String>((ref, String id) {
  final state = ref.watch(restaurantProvier);

  if (state is! CursorPagination) return null;

  return state.data.firstWhereOrNull((element) => element.id == id);
});
