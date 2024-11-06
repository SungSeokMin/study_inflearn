import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/const/colors.dart';
import 'package:flutter_intermediate/common/layout/default_layout.dart';
import 'package:flutter_intermediate/order/provider/order_provider.dart';
import 'package:flutter_intermediate/order/view/order_done_screen.dart';
import 'package:flutter_intermediate/product/component/product_card.dart';
import 'package:flutter_intermediate/user/provider/basket_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

class BasketScreen extends ConsumerWidget {
  static String get routeName => 'basket';

  const BasketScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final basket = ref.watch(basketProvider);

    if (basket.isEmpty) {
      return const DefaultLayout(
        title: '장바구니',
        child: Center(
          child: Text(
            '장바구니가 비어있습니다🥹',
          ),
        ),
      );
    }

    final productsTotal =
        basket.fold<int>(0, (previous, next) => previous + (next.product.price * next.count));

    final deliveryFee = basket.first.product.restaurant.deliveryFee;

    return DefaultLayout(
      title: '장바구니',
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: SafeArea(
          bottom: true,
          child: Column(
            children: [
              Expanded(
                child: ListView.separated(
                  itemCount: basket.length,
                  itemBuilder: (_, index) {
                    final model = basket[index];

                    return ProductCard.fromProductModel(
                      model: model.product,
                      onAdd: () {
                        ref.read(basketProvider.notifier).addToBasket(product: model.product);
                      },
                      onSubtract: () {
                        ref.read(basketProvider.notifier).removeFromBasket(product: model.product);
                      },
                    );
                  },
                  separatorBuilder: (_, index) => const Divider(
                    height: 32.0,
                  ),
                ),
              ),
              Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        '장바구니 금액',
                        style: TextStyle(color: bodyTextColor),
                      ),
                      Text('₩$productsTotal'),
                    ],
                  ),
                  if (basket.isNotEmpty)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          '배달비',
                          style: TextStyle(color: bodyTextColor),
                        ),
                        Text('₩$deliveryFee'),
                      ],
                    ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        '총액',
                        style: TextStyle(fontWeight: FontWeight.w500),
                      ),
                      Text('₩${productsTotal + deliveryFee}'),
                    ],
                  ),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () async {
                        final resposne = await ref.read(orderProvider.notifier).postOrder();

                        if (!context.mounted) return;

                        if (resposne) {
                          context.goNamed(OrderDoneScreen.routeName);
                        } else {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('결제 실패!'),
                            ),
                          );
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: primaryColor,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(4.0),
                        ),
                      ),
                      child: const Text(
                        '결제하기',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
