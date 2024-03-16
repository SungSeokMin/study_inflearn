import 'package:flutter_intermediate/common/model/cursor_pagination_model.dart';
import 'package:flutter_intermediate/common/provider/pagination_provider.dart';
import 'package:flutter_intermediate/restaurant/model/restaurant_model.dart';
import 'package:flutter_intermediate/restaurant/repository/restaurant_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final restaurantProvier =
    StateNotifierProvider<RestaurantStateNotifier, CursorPaginationBase>((ref) {
  final repository = ref.watch(restaurantRepositoryProvider);

  return RestaurantStateNotifier(
    repository: repository,
  );
});

class RestaurantStateNotifier extends PaginationProvider<RestaurantModel, RestaurantRepository> {
  RestaurantStateNotifier({
    required super.repository,
  });

  getDetail({
    required String id,
  }) async {
    // 만약 아직 데이터가 없는 상태라면 (CursorPagination이 아니라면)
    // 데이터를 가져오는 시도를 한다.
    if (state is! CursorPagination) {
      await paginate();
    }

    // 위에서 요청을 했는대 error가 발생한 경우
    if (state is! CursorPagination) return;

    final pState = state as CursorPagination;

    final response = await repository.getRestaurantDetail(id: id);

    // 요청 id = 10, list.where((element) => element.id == 10) -> 데이터 없음
    // 데이터가 없을때는 그냥 캐시의 끝에다가 데이터를 추가해버린다.
    if (pState.data.where((element) => element.id == id).isEmpty) {
      state = pState.copyWith(data: <RestaurantModel>[
        ...pState.data,
        response,
      ]);
    } else {
      state = pState.copyWith(
        data: pState.data.map<RestaurantModel>((e) => e.id == id ? response : e).toList(),
      );
    }
  }
}
