import 'package:dio/dio.dart';
import 'package:flutter_intermediate/common/const/data.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class CustomInterceptor extends Interceptor {
  final FlutterSecureStorage storage;

  CustomInterceptor({
    required this.storage,
  });

  // 요청이 보내질 때 마다 요청의 Header에 accessToken: true 값이 있다면
  // 실제 토큰을 storage에서 가져와서 authorization: Bearer $token으로 헤더를 변경한다.
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    if (options.headers['accessToken'] == 'true') {
      options.headers.remove('accessToken');

      final token = await storage.read(key: accessTokenKey);

      options.headers.addAll({
        'authorization': 'Bearer $token',
      });
    }

    if (options.headers['refreshToken'] == 'true') {
      options.headers.remove('refreshToken');

      final token = await storage.read(key: refreshTokenKey);

      options.headers.addAll({
        'authorization': 'Bearer $token',
      });
    }
    return super.onRequest(options, handler);
  }

  // 2) 응답을 받을 때
  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    // TODO: implement onResponse
    super.onResponse(response, handler);
  }

  // 3) 에러가 났을 때
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    // 401에러가 있을 때 토큰을 재발급 받는 시도를하고 토큰이 재발급 되면
    // 다시 새로운 토큰으로 요청을 한다.

    final refreshToken = await storage.read(key: refreshTokenKey);

    // refreshToken이 없으면 에러를 던진다.
    if (refreshToken == null) {
      return handler.reject(err);
    }

    final isStatus401 = err.response?.statusCode == 401;
    final isPathRefresh = err.requestOptions.path == '/auth/token';

    if (isStatus401 && !isPathRefresh) {
      final dio = Dio();

      try {
        final response = await dio.post(
          'http://$ip/auth/token',
          options: Options(
            headers: {
              'authorization': 'Bearer $refreshToken',
            },
          ),
        );

        final accessToken = response.data['accessToken'];

        final options = err.requestOptions;

        options.headers.addAll({
          'authorization': 'Bearer $accessToken',
        });

        await storage.write(key: accessTokenKey, value: accessToken);

        // 원래 요청 재전송
        final originResponse = await dio.fetch(options);

        return handler.resolve(originResponse);
      } on DioException catch (err) {
        return handler.reject(err);
      }
    }

    return handler.reject(err);
  }
}
