import 'package:dio/dio.dart';

import 'package:flutter_intermediate/common/model/login_response.dart';
import 'package:flutter_intermediate/common/model/token_response.dart';
import 'package:flutter_intermediate/common/utils/data_utils.dart';

class AuthRepository {
  final Dio dio;
  final String baseUrl;

  AuthRepository({
    required this.dio,
    required this.baseUrl,
  });

  Future<LoginResponse> login({
    required String username,
    required String password,
  }) async {
    final serialized = DataUtils.plainToBase64('$username:$password');

    final response = await dio.post(
      '$baseUrl/login',
      options: Options(
        headers: {'authorization': 'Basic $serialized'},
      ),
    );

    return LoginResponse.fromJson(response.data);
  }

  Future<TokenResponse> token() async {
    final response = await dio.post(
      '$baseUrl/token',
      options: Options(
        headers: {'refreshToken': 'true'},
      ),
    );

    return TokenResponse.fromJson(response.data);
  }
}
