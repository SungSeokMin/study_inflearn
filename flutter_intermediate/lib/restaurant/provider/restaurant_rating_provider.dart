import 'package:flutter_intermediate/common/model/cursor_pagination_model.dart';
import 'package:flutter_intermediate/restaurant/repository/restaurant_rating_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final restaurantRatingProvider =
    StateNotifierProviderFamily<RestaurantRatingStateNotifier, CursorPaginationBase, String>(
        (ref, id) {
  final repository = ref.watch(restaurantRatingRepositoryProvider(id));

  return RestaurantRatingStateNotifier(CursorPaginationLoading(), repository: repository);
});

class RestaurantRatingStateNotifier extends StateNotifier<CursorPaginationBase> {
  final RestaurantRatingRepository repository;

  RestaurantRatingStateNotifier(
    super.state, {
    required this.repository,
  });
}
