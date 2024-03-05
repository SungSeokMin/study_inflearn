import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_intermediate/restaurant/model/restaurant_detail_model.dart';
import 'package:retrofit/http.dart';
import 'package:retrofit/retrofit.dart';

part 'restaurant_repository.g.dart';

@RestApi()
abstract class RestaurantRepository {
  // baseUrl = http://$ip/restaurant
  factory RestaurantRepository(Dio dio, {String baseUrl}) = _RestaurantRepository;

  // @GET('/')
  // paginate();

  @GET('/{id}')
  @Headers({'accessToken': 'true'})
  Future<RestaurantDetailModel> getRestaurantDetail({
    @Path() required String id,
  });
}
