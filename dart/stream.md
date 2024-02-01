## stream 선언

```dart
import 'dart:async';

void main() {
  final controller = StreamController();
  final stream = controller.stream;
}
```

## 여러개의 listner 선언

```dart
import 'dart:async';

void main() {
  final controller = StreamController();
  final stream = controller.stream.asBroadcastStream();

  final streamListener1 = stream.listen((value) {
    print('Listener 1: $value');
  });

  final streamListener2 = stream.listen((value) {
    print('Listener 2: $value');
  });

  controller.sink.add(1);
  controller.sink.add(2);
  controller.sink.add(3);
  controller.sink.add(4);
}

/*
Listener 1: 1
Listener 2: 1
Listener 1: 2
Listener 2: 2
Listener 1: 3
Listener 2: 3
Listener 1: 4
Listener 2: 4
*/
```

## 조건에 충족된 stream

```dart
import 'dart:async';

void main() {
  final controller = StreamController();
  final stream = controller.stream.asBroadcastStream();

  final streamListener1 =
      stream.where((value) => value % 2 == 0).listen((value) {
    print('Listener 1: $value');
  });

  final streamListener2 =
      stream.where((value) => value % 2 == 1).listen((value) {
    print('Listener 2: $value');
  });

  controller.sink.add(1);
  controller.sink.add(2);
  controller.sink.add(3);
  controller.sink.add(4);
  controller.sink.add(5);
}

/*
Listener 2: 1
Listener 1: 2
Listener 2: 3
Listener 1: 4
Listener 2: 5
*/

```
