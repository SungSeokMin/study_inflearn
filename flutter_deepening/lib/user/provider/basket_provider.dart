import 'package:debounce_throttle/debounce_throttle.dart';
import 'package:flutter_intermediate/product/model/product_model.dart';
import 'package:flutter_intermediate/user/model/basket_item_model.dart';
import 'package:flutter_intermediate/user/model/patch_basket_body.dart';
import 'package:flutter_intermediate/user/repository/user_me_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:collection/collection.dart';

final basketProvider = StateNotifierProvider<BasketStateNotifier, List<BasketItemModel>>((ref) {
  final repository = ref.watch(userMeRepositoryProvider);

  return BasketStateNotifier(repository: repository);
});

class BasketStateNotifier extends StateNotifier<List<BasketItemModel>> {
  final UserMeRepository repository;
  final updateBasketDebounce = Debouncer(
    const Duration(seconds: 1),
    initialValue: null,
    checkEquality: false,
  );

  BasketStateNotifier({
    required this.repository,
  }) : super([]) {
    updateBasketDebounce.values.listen(
      (event) {
        patchBasket();
      },
    );
  }

  Future<void> patchBasket() async {
    await repository.patchBasket(
      body: PatchBasketBody(
        basket: state
            .map(
              (e) => PatchBasketBodyBasket(productId: e.product.id, count: e.count),
            )
            .toList(),
      ),
    );
  }

  Future<void> addToBasket({
    required ProductModel product,
  }) async {
    // 1) 아직 장바구니에 해당되는 상품이 없다면, 장바구니에 상품을 추가한다
    // 2) 만약에 이미 들어있다면, 장바구니에 있는 값에 + 1을 한다.
    final exists = state.firstWhereOrNull((e) => e.product.id == product.id) != null;

    if (exists) {
      state = state
          .map((e) => e.product.id == product.id ? e.copyWith(count: e.count + 1) : e)
          .toList();
    } else {
      state = [
        ...state,
        BasketItemModel(
          product: product,
          count: 1,
        ),
      ];
    }

    // Optimistic Response (긍정적 응답) -> 응답이 성공할거라고 가정하고 상태를 먼저 업데이트
    // await patchBasket();
    updateBasketDebounce.setValue(null);
  }

  Future<void> removeFromBasket({
    required ProductModel product,
    // true -> 카운트와 상관없이 아예 삭제
    bool isDelete = false,
  }) async {
    // 1) 장바구니에 상품이 존재할 때
    //    a) 상품의 카운트가 1보다 크면 -1 한다.
    //    b) 상품의 카운트가 1이면 삭제한다.
    // 2) 상품이 존재하지 않을 때, 즉시 함수를 반환한다.

    final exists = state.firstWhereOrNull((e) => e.product.id == product.id) != null;

    if (!exists) return;

    final existingProduct = state.firstWhere((e) => e.product.id == product.id);

    if (existingProduct.count == 1 || isDelete) {
      state = state.where((e) => e.product.id != product.id).toList();
    } else {
      state = state
          .map((e) => e.product.id == product.id ? e.copyWith(count: e.count - 1) : e)
          .toList();
    }

    // Optimistic Response (긍정적 응답) -> 응답이 성공할거라고 가정하고 상태를 먼저 업데이트
    // await patchBasket();
    updateBasketDebounce.setValue(null);
  }
}
