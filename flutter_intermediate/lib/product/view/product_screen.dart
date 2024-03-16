import 'package:flutter/widgets.dart';
import 'package:flutter_intermediate/common/component/pagination_list_view.dart';
import 'package:flutter_intermediate/product/component/product_card.dart';
import 'package:flutter_intermediate/product/model/product_model.dart';
import 'package:flutter_intermediate/product/provider/product_provider.dart';

class ProductScreen extends StatelessWidget {
  const ProductScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PaginationListView<ProductModel>(
      provider: productProvider,
      itemBuilder: <ProductModel>(context, index, model) {
        return ProductCard.fromProductModel(model: model);
      },
    );
  }
}
