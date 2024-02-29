import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_intermediate/common/const/data.dart';
import 'package:flutter_intermediate/restaurant/component/restaurant_card.dart';
import 'package:flutter_intermediate/restaurant/model/restaurant_model.dart';

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
                  final parseItem = RestaurantModel(
                    id: item['id'],
                    name: item['name'],
                    thumbUrl: 'http://$ip${item['thumbUrl']}',
                    tags: List<String>.from(item['tags']),
                    priceRange: RestaurantPriceRange.values.firstWhere(
                      (element) => element.name == item['priceRange'],
                    ),
                    ratings: item['ratings'],
                    ratingsCount: item['ratingsCount'],
                    deliveryTime: item['deliveryTime'],
                    deliveryFee: item['deliveryFee'],
                  );

                  return RestaurantCard(
                    image: Image.network(
                      parseItem.thumbUrl,
                      fit: BoxFit.cover,
                    ),
                    name: parseItem.name,
                    tags: parseItem.tags,
                    ratings: parseItem.ratings,
                    ratingsCount: parseItem.ratingsCount,
                    deliveryTime: parseItem.deliveryTime,
                    deliveryFee: parseItem.deliveryFee,
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
