import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  static const LatLng companyLatLng = LatLng(37.5233273, 126.921252);

  final CameraPosition initialPosition = const CameraPosition(target: companyLatLng, zoom: 15);

  static const double distance = 100;

  static Circle circle = Circle(
    circleId: const CircleId('circle'),
    center: companyLatLng,
    fillColor: Colors.blue.withOpacity(0.5),
    radius: distance,
    strokeColor: Colors.blue,
    strokeWidth: 1,
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: renderAppBar(),
      body: FutureBuilder(
          future: checkPermission(),
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }

            if (snapshot.data == '위치 권한이 허가 되었습니다.') {
              return Column(
                children: [
                  _CustomGoogleMap(initialPosition: initialPosition, circle: circle),
                  const _ChoolCheckButton(),
                ],
              );
            }

            return Center(
              child: Text(snapshot.data),
            );
          }),
    );
  }

  Future<String> checkPermission() async {
    final isLocationEnabled = await Geolocator.isLocationServiceEnabled();

    if (!isLocationEnabled) return '위치 서비스를 활성화 해주세요.';

    LocationPermission checkedPermission = await Geolocator.checkPermission();

    if (checkedPermission == LocationPermission.denied) {
      checkedPermission = await Geolocator.requestPermission();

      if (checkedPermission == LocationPermission.denied) {
        return '위치 권한을 허가해주세요.';
      }
    }

    if (checkedPermission == LocationPermission.deniedForever) {
      return '앱의 위치 권한을 세팅에서 허가해주세요.';
    }

    return '위치 권한이 허가 되었습니다.';
  }

  AppBar renderAppBar() {
    return AppBar(
      title: const Text(
        '오늘도 출근',
        style: TextStyle(
          color: Colors.blue,
          fontWeight: FontWeight.w700,
        ),
      ),
      backgroundColor: Colors.white,
    );
  }
}

class _CustomGoogleMap extends StatelessWidget {
  final CameraPosition initialPosition;
  final Circle circle;

  const _CustomGoogleMap({required this.initialPosition, required this.circle});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 2,
      child: GoogleMap(
        initialCameraPosition: initialPosition,
        mapType: MapType.normal,
        myLocationEnabled: true,
        myLocationButtonEnabled: false,
        circles: {circle},
      ),
    );
  }
}

class _ChoolCheckButton extends StatelessWidget {
  const _ChoolCheckButton();

  @override
  Widget build(BuildContext context) {
    return const Expanded(
      child: Text('출근'),
    );
  }
}
