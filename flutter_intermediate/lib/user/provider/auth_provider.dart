import 'package:flutter/foundation.dart';
import 'package:flutter_intermediate/user/model/user_model.dart';
import 'package:flutter_intermediate/user/provider/user_me_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

final authProvider = ChangeNotifierProvider<AuthProvider>((ref) {
  return AuthProvider(ref: ref);
});

class AuthProvider extends ChangeNotifier {
  final Ref ref;

  AuthProvider({
    required this.ref,
  }) {
    ref.listen<UserModelBase?>(userMeProvider, (previous, next) {
      if (previous != next) {
        notifyListeners();
      }
    });
  }

  // SplashScreen
  // 앱을 처음 시작했을 때 토큰이 존재하는지 확인하고
  // 로그인 또는 홈 스크린으로 이동하는 과정이 필요
  String? redirectLogic(GoRouterState state) {
    final UserModelBase? user = ref.read(userMeProvider);

    final logginIn = state.uri.toString() == '/login';

    // 유저 정보가 없으면 로그인 중이면 로그인 페이지에 두고, 만약에 로그인중이 아니라면 로그인 페이지로 이동
    if (user == null) {
      return logginIn ? null : '/login';
    }

    // UserModel
    // 사용자 정보가 있는 상태
    //  로그인 중 && SplashScreen -> 홈으로 이동
    if (user is UserModel) {
      return logginIn && state.uri.toString() == '/splash' ? '/' : null;
    }

    // UserModelError
    if (user is UserModelError) {
      return logginIn ? '/login' : null;
    }

    return null;
  }
}
