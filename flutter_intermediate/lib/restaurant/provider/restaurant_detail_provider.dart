import 'package:flutter_intermediate/restaurant/model/restaurant_detail_model.dart';
import 'package:flutter_intermediate/restaurant/repository/restaurant_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final restaurantDetailProvider =
    Provider.family<Future<RestaurantDetailModel>, String>((ref, String id) {
  final repository = ref.watch(restaurantRepositoryProvider);

  return repository.getRestaurantDetail(id: id);
});
