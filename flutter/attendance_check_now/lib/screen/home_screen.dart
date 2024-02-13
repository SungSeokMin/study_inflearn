import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool choolCheckDone = false;

  static const LatLng companyLatLng = LatLng(37.5233273, 126.921252);

  final CameraPosition initialPosition = const CameraPosition(target: companyLatLng, zoom: 15);

  static const double okDistance = 100;

  static Circle withinDistanceCircle = Circle(
    circleId: const CircleId('withinDistanceCircle'),
    center: companyLatLng,
    fillColor: Colors.blue.withOpacity(0.5),
    radius: okDistance,
    strokeColor: Colors.blue,
    strokeWidth: 1,
  );
  static Circle notWithinDistanceCircle = Circle(
    circleId: const CircleId('notWithinDistanceCircle'),
    center: companyLatLng,
    fillColor: Colors.red.withOpacity(0.5),
    radius: okDistance,
    strokeColor: Colors.red,
    strokeWidth: 1,
  );
  static Circle checkDoneCircle = Circle(
    circleId: const CircleId('checkDoneCircle'),
    center: companyLatLng,
    fillColor: Colors.green.withOpacity(0.5),
    radius: okDistance,
    strokeColor: Colors.green,
    strokeWidth: 1,
  );

  static Marker marker = const Marker(
    markerId: MarkerId('marker'),
    position: companyLatLng,
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
              return StreamBuilder<Position>(
                  stream: Geolocator.getPositionStream(),
                  builder: (context, snapshot) {
                    bool isWithinRange = false;

                    if (snapshot.hasData) {
                      final start = snapshot.data!;
                      const end = companyLatLng;

                      final distance = Geolocator.distanceBetween(
                        start.latitude,
                        start.longitude,
                        end.latitude,
                        end.longitude,
                      );

                      if (distance < okDistance) {
                        isWithinRange = true;
                      }
                    }

                    return Column(
                      children: [
                        _CustomGoogleMap(
                          initialPosition: initialPosition,
                          withinDistanceCircle: choolCheckDone
                              ? checkDoneCircle
                              : isWithinRange
                                  ? withinDistanceCircle
                                  : notWithinDistanceCircle,
                          marker: marker,
                        ),
                        _ChoolCheckButton(
                          isWithinRange: isWithinRange,
                          choolCheckDone: choolCheckDone,
                          onPressed: onChoolCheckPressed,
                        ),
                      ],
                    );
                  });
            }

            return Center(
              child: Text(snapshot.data),
            );
          }),
    );
  }

  void onChoolCheckPressed() async {
    final result = await showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: const Text('출근하기'),
            content: const Text('출근을 하시겠습니까?'),
            actions: [
              TextButton(
                  onPressed: () {
                    Navigator.of(context).pop(false);
                  },
                  child: const Text('취소')),
              TextButton(
                  onPressed: () {
                    Navigator.of(context).pop(true);
                  },
                  child: const Text('출근하기')),
            ],
          );
        });

    if (result) {
      setState(() {
        choolCheckDone = result;
      });
    }
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
  final Circle withinDistanceCircle;
  final Marker marker;

  const _CustomGoogleMap(
      {required this.initialPosition, required this.withinDistanceCircle, required this.marker});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 2,
      child: GoogleMap(
        initialCameraPosition: initialPosition,
        mapType: MapType.normal,
        myLocationEnabled: true,
        myLocationButtonEnabled: false,
        circles: {withinDistanceCircle},
        markers: {marker},
      ),
    );
  }
}

class _ChoolCheckButton extends StatelessWidget {
  final bool isWithinRange;
  final bool choolCheckDone;
  final VoidCallback onPressed;

  const _ChoolCheckButton({
    required this.isWithinRange,
    required this.choolCheckDone,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Icon(
          Icons.timelapse_outlined,
          size: 50.0,
          color: choolCheckDone
              ? Colors.green
              : isWithinRange
                  ? Colors.blue
                  : Colors.red,
        ),
        const SizedBox(height: 20.0),
        if (!choolCheckDone && isWithinRange)
          TextButton(
            onPressed: onPressed,
            child: const Text('출근하기'),
          ),
      ]),
    );
  }
}
