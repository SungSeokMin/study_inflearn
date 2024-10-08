import 'package:debounce_throttle/debounce_throttle.dart';
import 'package:flutter_intermediate/common/model/cursor_pagination_model.dart';
import 'package:flutter_intermediate/common/model/model_with_id.dart';
import 'package:flutter_intermediate/common/model/pagination_params.dart';
import 'package:flutter_intermediate/common/repository/base_pagination_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class _PaginationInfo {
  final int fetchCount;
  final bool fetchMore;
  final bool forceRefetch;

  _PaginationInfo({
    this.fetchCount = 20,
    this.fetchMore = false,
    this.forceRefetch = false,
  });
}

class PaginationProvider<T extends IModelWithId, U extends IBasePaginationRepository<T>>
    extends StateNotifier<CursorPaginationBase> {
  final U repository;
  final paginationThrottle = Throttle(
    const Duration(seconds: 3),
    initialValue: _PaginationInfo(),
    checkEquality: false,
  );

  PaginationProvider({
    required this.repository,
  }) : super(CursorPaginationLoading()) {
    paginate();

    paginationThrottle.values.listen((state) {
      _throttledPagination(state);
    });
  }

  Future<void> paginate({
    int fetchCount = 20,
    // 데이터 추가 요청 -> true: 추가 데이터 요청, false: 첫 20개 요청
    bool fetchMore = false,
    // 강제로 다시 로딩 -> true: CursorPaginationLoading() 호출
    bool forceRefetch = false,
  }) async {
    paginationThrottle.setValue(
      _PaginationInfo(fetchCount: fetchCount, fetchMore: fetchMore, forceRefetch: forceRefetch),
    );
  }

  _throttledPagination(_PaginationInfo info) async {
    final fetchCount = info.fetchCount;
    final fetchMore = info.fetchMore;
    final forceRefetch = info.forceRefetch;

    try {
      /**
     * [state의 5가지 상태]
     * CursorPagination: 정상적으로 데이터가 존재하는 상태
     * CursorPaginationLoading: 데이터가 로딩중인 상태
     * CursorPaginationError: 에러가 있는 상태
     * CursorPaginationRefetching: 첫번째 페이지부터 다시 데이터를 가져올 때
     * CursorPaginationFetchingMore: 추가 데이터를 paginate 해오라는 요청을 받았을 때
     */

      // 상태가 존재하고, 강제 로딩을 하지 않는 경우
      if (state is CursorPagination && !fetchMore) {
        // 위의 조건에 부합하여 state는 무조건 있다.
        final pState = state as CursorPagination;

        // 더이상 가져올 데이터가 없는 경우 paginate()를 호출할 필요가 없다.
        if (!pState.meta.hasMore) return;
      }

      // 추가 데이터 요청이 있지만, 로딩 상태의 경우 paginate()를 호출할 필요가 없다.
      final isLoading = state is CursorPaginationLoading;
      final isRefetching = state is CursorPaginationRefetching;
      final isFetchingMore = state is CursorPaginationFetchingMore;

      if (fetchMore && (isLoading || isRefetching || isFetchingMore)) return;

      // PaginationParams 생성
      PaginationParams paginationParams = PaginationParams(
        count: fetchCount,
      );

      // fetchMore: 추가적으로 데이터를 가져오는 상황
      if (fetchMore) {
        final pState = state as CursorPagination<T>;

        state = CursorPaginationFetchingMore<T>(
          meta: pState.meta,
          data: pState.data,
        );

        paginationParams = paginationParams.copyWith(after: pState.data.last.id);
      }
      // 데이터를 처음부터 가져오는 상황
      else {
        // 만약 데이터가 있는 상황이라면 기존 데이터를 보존한채로 API 요청
        if (state is CursorPagination && !forceRefetch) {
          final pState = state as CursorPagination<T>;

          state = CursorPaginationRefetching<T>(
            meta: pState.meta,
            data: pState.data,
          );
        } else {
          state = CursorPaginationLoading();
        }
      }

      final response = await repository.paginate(
        paginationParams: paginationParams,
      );

      if (state is CursorPaginationFetchingMore) {
        final pState = state as CursorPaginationFetchingMore<T>;

        state = response.copyWith(data: [...pState.data, ...response.data]);
      } else {
        state = response;
      }
    } catch (err) {
      state = CursorPaginationError(message: '데이터를 가져오지 못했습니다.');
    }
  }
}
