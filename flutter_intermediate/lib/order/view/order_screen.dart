import 'package:flutter/widgets.dart';
import 'package:flutter_intermediate/common/component/pagination_list_view.dart';
import 'package:flutter_intermediate/order/component/order_card.dart';
import 'package:flutter_intermediate/order/model/order_model.dart';
import 'package:flutter_intermediate/order/provider/order_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class OrderScreen extends ConsumerWidget {
  const OrderScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return PaginationListView<OrderModel>(
      provider: orderProvider,
      itemBuilder: <OrderModel>(_, index, model) => OrderCard.fromModel(model: model),
    );
  }
}
