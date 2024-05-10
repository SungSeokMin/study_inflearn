import 'package:flutter_architecture/data/photo_api_repository.dart';
import 'package:flutter_architecture/model/photo.dart';
import 'package:flutter_architecture/ui/home_view_model.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;

void main() {
  test('Stream이 잘 동작해야 한다.', () async {
    final viewModel = HomeViewModel(repository: FakePhotoApiRepository());

    await viewModel.fetch('apple');

    expect(
      viewModel.photoStream,
      emitsInOrder([
        equals([]),
        equals(fakeJson.map((e) => Photo.fromJson(e)).toList()),
      ]),
    );
  });
}

class FakePhotoApiRepository extends PhotoApiRepository {
  @override
  Future<List<Photo>> fetch(String query, {http.Client? client}) async {
    Future.delayed(const Duration(milliseconds: 500));

    return fakeJson.map((e) => Photo.fromJson(e)).toList();
  }
}

List<Map<String, dynamic>> fakeJson = [
  {
    "id": 8595521,
    "pageURL": "https://pixabay.com/photos/forsythia-flowers-branch-8595521/",
    "type": "photo",
    "tags": "forsythia, flowers, branch",
    "previewURL": "https://cdn.pixabay.com/photo/2024/02/25/10/11/forsythia-8595521_150.jpg",
    "previewWidth": 112,
    "previewHeight": 150,
    "webformatURL":
        "https://pixabay.com/get/g089075d7466a784c3f8896403bb2bbbf6c2453c588df76da6bf308c68b32bc78e607bcf316ac43a3c1af7e805ff4b066a5f2c5da75ec7e769a03d5773ad8d154_640.jpg",
    "webformatWidth": 480,
    "webformatHeight": 640,
    "largeImageURL":
        "https://pixabay.com/get/g6ece0fbef3a19c778965e707441f5683cc377f18a76b40b83b666e4b2fb124fb1ad91e5b0209696b174db27f95467d9b7b02e5f56625ce26a7bdf6975778dea9_1280.jpg",
    "imageWidth": 3024,
    "imageHeight": 4032,
    "imageSize": 970371,
    "views": 97534,
    "downloads": 80389,
    "collections": 238,
    "likes": 1068,
    "comments": 47,
    "user_id": 10328767,
    "user": "Mylene2401",
    "userImageURL": "https://cdn.pixabay.com/user/2020/08/02/06-54-24-533_250x250.jpeg"
  },
  {
    "id": 3063284,
    "pageURL": "https://pixabay.com/photos/rose-flower-petal-floral-noble-3063284/",
    "type": "photo",
    "tags": "rose, beautiful flowers, flower",
    "previewURL": "https://cdn.pixabay.com/photo/2018/01/05/16/24/rose-3063284_150.jpg",
    "previewWidth": 150,
    "previewHeight": 99,
    "webformatURL":
        "https://pixabay.com/get/gc320ee762ba7ad277b408177d1fb3d3a7685f739dea8a1240b9b0b8d7dcde66a30c77ed65a795aacf5063273139bd15b39bf99f595a24ddf9de532b8e45cf034_640.jpg",
    "webformatWidth": 640,
    "webformatHeight": 426,
    "largeImageURL":
        "https://pixabay.com/get/g5106b7d4717deb64102494cd5007fdc65e496cab594afe80861f362eecfa684223c8c6b953a6b27fb0846ba853177c9e3aa6c7902faa58c0a3da86381b179173_1280.jpg",
    "imageWidth": 6000,
    "imageHeight": 4000,
    "imageSize": 3574625,
    "views": 1200031,
    "downloads": 785646,
    "collections": 1617,
    "likes": 1754,
    "comments": 352,
    "user_id": 1564471,
    "user": "anncapictures",
    "userImageURL": "https://cdn.pixabay.com/user/2015/11/27/06-58-54-609_250x250.jpg"
  },
];
