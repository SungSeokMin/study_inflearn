import 'package:flutter/widgets.dart';
import 'package:flutter_intermediate/product/provider/product_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ProductScreen extends ConsumerStatefulWidget {
  const ProductScreen({super.key});

  @override
  ConsumerState<ProductScreen> createState() => _ProductScreenState();
}

class _ProductScreenState extends ConsumerState<ProductScreen> {
  @override
  Widget build(BuildContext context) {
    final state = ref.watch(productProvider);

    print(state);

    return const Center(
      child: Text('음식'),
    );
  }
}
