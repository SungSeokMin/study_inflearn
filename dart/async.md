## 비동기 처리

```dart
void main() {
  Future<String> name = Future.value('성석민');
  Future<int> number = Future.value(1);
  Future<bool> isTrue = Future.value(true);

  addNumbers(1, 1);
  addNumbers(2, 2);
}

void addNumbers(int number1, int number2) {
  print('계산 시작: $number1 + $number2');

  // 2개의 파라미터 (Duration 지연시간, 지연 시간이 지난 후 실행할 함수)
  Future.delayed(Duration(seconds: 2), () {
    print('계산 완료 $number1 + $number2 = ${number1 + number2}');
  });

  print('함수 완료');
}

/*
계산 시작: 1 + 1
함수 완료
계산 시작: 2 + 2
함수 완료
계산 완료 1 + 1 = 2
계산 완료 2 + 2 = 4
*/
```

## async / await

```dart
void main() {
  Future<String> name = Future.value('성석민');
  Future<int> number = Future.value(1);
  Future<bool> isTrue = Future.value(true);

  addNumbers(1, 1);
  addNumbers(2, 2);
}

void addNumbers(int number1, int number2) async {
  print('계산 시작: $number1 + $number2');

  // 2개의 파라미터 (Duration 지연시간, 지연 시간이 지난 후 실행할 함수)
  await Future.delayed(Duration(seconds: 2), () {
    print('계산 완료 $number1 + $number2 = ${number1 + number2}');
  });

  print('함수 완료');
}

/*
계산 시작: 1 + 1
계산 시작: 2 + 2
계산 완료 1 + 1 = 2
함수 완료
계산 완료 2 + 2 = 4
함수 완료
*/
```

async / await 문법은 Future를 반환하는 곳에서만 사용 가능하다.

```dart
void main() async {
  Future<String> name = Future.value('성석민');
  Future<int> number = Future.value(1);
  Future<bool> isTrue = Future.value(true);

  await addNumbers(1, 1);
  await addNumbers(2, 2);
}

Future<void> addNumbers(int number1, int number2) async {
  print('계산 시작: $number1 + $number2');

  // 2개의 파라미터 (Duration 지연시간, 지연 시간이 지난 후 실행할 함수)
  await Future.delayed(Duration(seconds: 2), () {
    print('계산 완료 $number1 + $number2 = ${number1 + number2}');
  });

  print('함수 완료');
}

/*
계산 시작: 1 + 1
계산 완료 1 + 1 = 2
함수 완료
계산 시작: 2 + 2
계산 완료 2 + 2 = 4
함수 완료
*/
```

## async / await 리턴

```dart
void main() async {
  Future<String> name = Future.value('성석민');
  Future<int> number = Future.value(1);
  Future<bool> isTrue = Future.value(true);

  final result1 = await addNumbers(1, 1);
  final result2 = await addNumbers(2, 2);

  print('result1: $result1');
  print('result2: $result2');
  print('result1 + result2: ${result1 + result2}');
}

Future<int> addNumbers(int number1, int number2) async {
  print('계산 시작: $number1 + $number2');

  // 2개의 파라미터 (Duration 지연시간, 지연 시간이 지난 후 실행할 함수)
  await Future.delayed(Duration(seconds: 2), () {
    print('지연...');
  });

  print('함수 완료');

  return number1 + number2;
}

/*
계산 시작: 1 + 1
지연...
함수 완료
계산 시작: 2 + 2
지연...
함수 완료
result1: 2
result2: 4
result1 + result2: 6
*/
```
