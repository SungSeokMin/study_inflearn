import 'package:dio/dio.dart' hide Headers;
import 'package:flutter_intermediate/common/const/data.dart';
import 'package:flutter_intermediate/common/dio/dio.dart';
import 'package:flutter_intermediate/user/model/basket_item_model.dart';
import 'package:flutter_intermediate/user/model/patch_basket_body.dart';
import 'package:flutter_intermediate/user/model/user_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:retrofit/http.dart';
import 'package:retrofit/retrofit.dart';

part 'user_me_repository.g.dart';

final userMeRepositoryProvider = Provider<UserMeRepository>((ref) {
  final dio = ref.watch(dioProvider);

  return UserMeRepository(dio, baseUrl: 'http://$ip/user/me');
});

@RestApi()
abstract class UserMeRepository {
  // baseUrl = 'http://$ip/user/me'
  factory UserMeRepository(Dio dio, {String baseUrl}) = _UserMeRepository;

  @GET('/')
  @Headers({'accessToken': 'true'})
  Future<UserModel> getMe();

  @GET('/basket')
  @Headers({'accessToken': 'true'})
  Future<List<BasketItemModel>> getBasket();

  @PATCH('/basket')
  @Headers({'accessToken': 'true'})
  Future<List<BasketItemModel>> patchBasket({
    @Body() required PatchBasketBody body,
  });
}
