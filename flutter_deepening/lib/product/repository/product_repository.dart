import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_intermediate/common/const/data.dart';
import 'package:flutter_intermediate/common/dio/dio.dart';
import 'package:flutter_intermediate/common/model/cursor_pagination_model.dart';
import 'package:flutter_intermediate/common/model/pagination_params.dart';
import 'package:flutter_intermediate/common/repository/base_pagination_repository.dart';
import 'package:flutter_intermediate/product/model/product_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/retrofit.dart';

part 'product_repository.g.dart';

final productRepositoryProvider = Provider<ProductRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return ProductRepository(dio, baseUrl: 'http://$ip/product');
});

@RestApi()
abstract class ProductRepository implements IBasePaginationRepository<ProductModel> {
  // baseUrl = 'http://$ip/product'

  factory ProductRepository(Dio dio, {String baseUrl}) = _ProductRepository;

  @override
  @GET('/')
  @Headers({'accessToken': 'true'})
  Future<CursorPagination<ProductModel>> paginate({
    @Queries() PaginationParams? paginationParams = const PaginationParams(),
  });
}
