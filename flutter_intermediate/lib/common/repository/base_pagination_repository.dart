import 'package:flutter_intermediate/common/model/cursor_pagination_model.dart';
import 'package:flutter_intermediate/common/model/pagination_params.dart';

abstract class IBasePaginationRepository<T> {
  Future<CursorPagination<T>> paginate({
    PaginationParams? paginationParams = const PaginationParams(),
  });
}
