import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/const/data.dart';
import 'package:flutter_intermediate/restaurant/component/restaurant_card.dart';
import 'package:flutter_intermediate/restaurant/model/restaurant_model.dart';
import 'package:flutter_intermediate/restaurant/view/restaurant_detail_screen.dart';

class RestaurantScreen extends StatelessWidget {
  const RestaurantScreen({super.key});

  Future<List> paginateRestaurant() async {
    final dio = Dio();

    final accessToken = await storage.read(key: accessTokenKey);

    final response = await dio.get(
      'http://$ip/restaurant',
      options: Options(
        headers: {
          'authorization': 'Bearer $accessToken',
        },
      ),
    );

    return response.data['data'];
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: FutureBuilder<List>(
            future: paginateRestaurant(),
            builder: (context, snapshot) {
              if (!snapshot.hasData) {
                return Container();
              }

              return ListView.separated(
                itemCount: snapshot.data!.length,
                itemBuilder: (context, index) {
                  final item = snapshot.data![index];
                  final parseItem = RestaurantModel.fromJson(json: item);

                  return GestureDetector(
                    onTap: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => const RestaurantDetailScreen(),
                        ),
                      );
                    },
                    child: RestaurantCard.fromModel(model: parseItem),
                  );
                },
                separatorBuilder: (context, index) {
                  return const SizedBox(height: 16.0);
                },
              );
            }),
      ),
    );
  }
}
