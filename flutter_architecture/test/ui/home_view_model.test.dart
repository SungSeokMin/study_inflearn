import 'package:flutter_architecture/data/photo_api_repository.dart';
import 'package:flutter_architecture/model/photo_model.dart';
import 'package:flutter_architecture/ui/home_view_model.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('Stream이 잘 동작해야한다.', () async {
    final viewModel = HomeViewModel(FakePhotoApiReposotory());

    await viewModel.fetch('apple');
    await viewModel.fetch('apple');

    final result = fakeJson.map((e) => Photo.fromJson(e)).toList();

    expect(
      viewModel.photoStream,
      emitsInOrder(
        [
          equals([]),
          equals(result),
          equals(result),
        ],
      ),
    );
  });
}

class FakePhotoApiReposotory extends PhotoApiRepository {
  @override
  Future<List<Photo>> fetch(String query) async {
    Future.delayed(const Duration(microseconds: 500));

    return fakeJson.map((e) => Photo.fromJson(e)).toList();
  }
}

List<Map<String, dynamic>> fakeJson = [
  {
    "id": 1122537,
    "pageURL": "https://pixabay.com/photos/apple-water-droplets-fruit-moist-1122537/",
    "type": "photo",
    "tags": "apple, water droplets, fruit",
    "previewURL": "https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_150.jpg",
    "previewWidth": 150,
    "previewHeight": 95,
    "webformatURL":
        "https://pixabay.com/get/ga9fd35679a9fccfc13c6b78027d65c8a73c058c24716cda83f057d2ecd054d3247a2a429a7ef4dbbc3d142a2328bbac01c14df22c81e0fda0dac47e3ac3e82b0_640.jpg",
    "webformatWidth": 640,
    "webformatHeight": 409,
    "largeImageURL":
        "https://pixabay.com/get/gb4c87b4dff4cdc0a23b89374b7d60d04a576f2f37cdc553113cb7f1fd1ec52f2c28a0d0ad98e927c42eb7d290dda0e4f5fffbed5c7c132ae072f8b4a566d762d_1280.jpg",
    "imageWidth": 4752,
    "imageHeight": 3044,
    "imageSize": 5213632,
    "views": 389283,
    "downloads": 235511,
    "collections": 1156,
    "likes": 1259,
    "comments": 199,
    "user_id": 1445608,
    "user": "mploscar",
    "userImageURL": "https://cdn.pixabay.com/user/2016/01/05/14-08-20-943_250x250.jpg"
  },
  {
    "id": 256261,
    "pageURL": "https://pixabay.com/photos/apple-books-still-life-fruit-food-256261/",
    "type": "photo",
    "tags": "apple, books, still life",
    "previewURL": "https://cdn.pixabay.com/photo/2014/02/01/17/28/apple-256261_150.jpg",
    "previewWidth": 150,
    "previewHeight": 99,
    "webformatURL":
        "https://pixabay.com/get/gcdedc2bf753a1ffbcb02cc34fc772d98fab686ba61f286bb9225b56a09466e0821c48a23cecf10b164159d42dda38abf_640.jpg",
    "webformatWidth": 640,
    "webformatHeight": 423,
    "largeImageURL":
        "https://pixabay.com/get/gf0445c4689839853cbcfc9249416f7a59597a76e7ee971c4f5af8b25d938316ad2f7b85bab1021708caab68a88219ca65f22898867686ebf3db285154fde8091_1280.jpg",
    "imageWidth": 4928,
    "imageHeight": 3264,
    "imageSize": 2987083,
    "views": 588483,
    "downloads": 326795,
    "collections": 1019,
    "likes": 1039,
    "comments": 253,
    "user_id": 143740,
    "user": "jarmoluk",
    "userImageURL": "https://cdn.pixabay.com/user/2019/09/18/07-14-26-24_250x250.jpg"
  }
];
