## 정수(integer) 선언

```dart
void main() {
  int number1 = 10;
  int number2 = 20;

  print(number1 + number2); // 30
  print(number1 - number2); // -10
  print(number1 / number2); // 0.5
  print(number1 * number2); // 200
}
```

## 실수(double) 선언

```dart
void main() {
  double number1 = 2.5;
  double number2 = 0.5;

  print(number1 + number2); // 3
  print(number1 - number2); // 2
  print(number1 / number2); // 5
  print(number1 * number2); // 1.25
}
```

## 논리(Boolean) 선언

```dart
void main() {
  bool isTrue = true;
  bool isFalse = false;

  print(isTrue); // true
  print(isFalse); // false
}
```

## 글자(String) 선언

```dart
void main() {
  String name = '성석민';
  String name2 = '홍길동';

  print('${name} ${name2}'); // 성석민 홍길동
}
```

## nullable / non-nullable 선언

- nullable: null이 될 수 있다.
- non-nullable: null이 될 수 없다.

```dart
void main() {
  String name = '성석민';
  name = null; // error: A value of type 'Null' can't be assigned to a variable of type 'String'.

  String? name2 = '홍길동';
  name2 = '장보고';

  int? number = 4;
  number = null;
  // number가 null이면 오른쪽 값을 할당한다.
  number ??= 2;

  print(number); // 2
}
```

## final / const 선언

값을 할당 후 다시 변경할 수 없다.

build time: 사람이 이해할 수 있는 코드를 컴퓨터가 이해할 수 있는 코드(이진수)로 변환하는 시간

- final: build time에 값을 알지 못해도 된다.
- const: build time에 값을 알고 있어야 한다.

```dart
void main() {
  final DateTime now = DateTime.now();

  const DateTime now2 = DateTime.now(); // error: The constructor being called isn't a const constructor.
}
```

## 비교 연산

```dart
void main() {
  int number1 = 1;
  int number2 = 2;

  print(number1 == number2) // true
  print(number1 != number2) // false

  print(number1 > number2) // false
  print(number1 >= number2) // false
  print(number1 < number2) // true
  print(number1 <= number2) // true
}
```

## 타입 비교

```dart
void main() {
  int number = 1;

  print(number is int); // true
  print(number is String); // false

  print(number is! int) // false
  print(number is! String) // true
}
```

## 논리 연산

- && - and 조건
- || - or 조건

```dart
void main() {
  bool result = 12 > 10 && 1 > 0;
  print(result) // true

  bool result2 = 12 > 0 && 0 > 1;
  print(result2) // false

  bool result3 = 12 > 10 || 1 > 0;
  print(result3) // true

  bool result4 = 12 > 10 || 0 > 1;
  print(result4) // true

  bool result5 = 12 < 10 || 0 > 1;
  print(result5) // false
}
```

## List

- value 형태로 데이터 저장

```dart
void main() {
  List<String> list = ['a', 'b', 'c', 'd'];

  print(list.length); // 4

  print(list[0]); // 'a'
  print(list[3]); // 'd'

  // 요소 추가
  list.add('e');
  print(list); // ['a', 'b', 'c', 'd', 'e']

  // 요소 삭제
  list.remove('b');
  print(list); // [a, c, d, e]

  // index 찾기
  print(list.indexOf('c')); // 1
}
```

## Map

- key: value 형태로 데이터 저장

```dart
void main() {
  Map<String, String> dictionary = {
    'Harry Potter': '해리포터',
  };

  print(dictionary); // {Harry Potter: 해리포터}

  Map<String, bool> isHarryPotter = {
    'Harry Potter': true,
    'Ironman': false,
  };

  print(isHarryPotter); // {Harry Potter: true, Ironman: false}

  // 요소 추가 (방법 1)
  isHarryPotter.addAll({
    'Spiderman': false
  });
  print(isHarryPotter); // {Harry Potter: true, Ironman: false, Spiderman: false}

  // 요소 추가 (방법 2)
  isHarryPotter['Hulk'] = false;
  print(isHarryPotter); // {Harry Potter: true, Ironman: false, Spiderman: false, Hulk: false}

  // 요소 찾기
  print(isHarryPotter['Ironman']); // false

  // 요소 삭제
  isHarryPotter.remove('Harry Potter');
  print(isHarryPotter); // {Ironman: false, Spiderman: false, Hulk: false}

  // keys 추출
  print(isHarryPotter.keys); // (Ironman, Spiderman, Hulk)

  // values 추출
  print(isHarryPotter.values); // (false, false, false)
}
```

## Set

- Map과 비슷하지만 중복값 제거

```dart
void main() {
  final Set<String> names = {'성석민', '개발자', '플루터','성석민'};
  print(names); // {성석민, 개발자, 플루터}

  // 요소 추가
  names.add('성석민');
  print(names); // {성석민, 개발자, 플루터}

  names.add('홍길동');
  print(names); // {성석민, 개발자, 플루터, 홍길동}

  // 요소 삭제
  names.remove('홍길동');
  print(names); // {성석민, 개발자, 플루터}

  // 요소 존재여부
  print(names.contains('성석민')); // true
  print(names.contains('아저씨')); // false
}
```

## if 조건문

```dart
void main() {
  int number = 2;

  // 같은 동작을 합니다.
  if(number % 2 == 0) {
    print('짝수 입니다.');
  } else if(number % 2 == 1) {
    print('홀수 입니다.');
  } else {
    print('존재하지 않은 수 입니다.');
  }

  if(number % 2 == 0) print('짝수 입니다.');
  else if(number % 2 == 1) print('홀수 입니다.');
  else print('존재하지 않은 수 입니다.');
}
```

## switch 조건문

```dart
void main() {
  int number = 2;

  switch (number % 2) {
    case 0:
      print('짝수 입니다.');
      break;

    case 1:
      print('홀수 입니다.');
      break;

    default:
      print('존재하지 않은 수 입니다.');
  }
}

```

## for loop

```dart
void main() {
  List<int> numbers = [1, 2, 3, 4, 5];

  // for loop
  int total = 0;

  for(int i = 0; i <= numbers.length; i++) {
    total += i;
  }
  print(total); // 15

  // for ... in loop
  int total2 = 0;

  for(int number in numbers) {
    total2 += number;
  }
  print(total2);
}
```

## while loop

```dart
void main() {
  int total = 0;

  while(total < 10) {
    total += 1;
  }

  print(total);

  // while문에 break 사용
  while(total < 10) {
    total += 1;

    if(total == 5) break;
  }

  print(total);
}
```

## enum

```dart
enum Status {
  approved, // 승인
  pending, // 대기
  rejected, // 거절
}

void main() {
  Status status = Status.pending;

  if(status == Status.approved) {
    print('승인 상태');
  } else if (status == Status.pending) {
    print('대기 상태');
  } else if (status == Status.rejected) {
    print('거절 상태');
  } else {
    print('상태 없음');
  }
}
```

## function

Return Type

- void: 아무것도 반환하지 않는다.
- [String, int, bool]: 각 타입을 반환한다.

```dart
void main() {
  print(addNumbersAndIsEven1(10, 20, 30)); // true
  print(addNumbersAndIsEven1(11, 11, 11)); // false

  print(addNumbersAndIsEven2(10)); // true

  print(addNumbersAndIsEven3(y: 10, x: 20, z: 30)); // true

  print(addNumbersAndIsEven4(10, y: 20, z: 30)); // true

  print(addNumbersAndIsEven5(x: 10, y: 20)); // true
  print(addNumbersAndIsEven5(x: 10, y: 20, z: 49)); // false


}

// 세개의 숫자 (x, y, z)를 더하고 짝수인지 홀수인지 알려주는 함수
// positinal parameter - 순서가 중요한 파라미터
addNumbersAndIsEven1(int x, int y, int z) {
  int sum = x + y + z;

  return sum % 2 == 0;
}

// optional parameter - 있어도 되고 없어도 되는 파라미터
addNumbersAndIsEven2(int x, [int y = 0, int z = 0]) {
  int sum = x + y + z;

  return sum % 2 == 0;
}

// named parameter - 이름이 있는 파라미터 (순서가 중요하지 않다.)
addNumbersAndIsEven3({required int x, required int y, required int z}) {
  int sum = x + y + z;

  return sum % 2 == 0;
}

// positional + named parameter
addNumbersAndIsEven4(int x, {required int y, required int z}) {
  int sum = x + y + z;

  return sum % 2 == 0;
}

// optional + named parameter
addNumbersAndIsEven5({required int x, required int y, int z = 30}) {
  int sum = x + y + z;

  return sum % 2 == 0;
}
```

## typedef

```dart
void main() {
  int result = calculate(10, 20, 30, add);
  print(result); // 60

  int result2 = calculate(10, 20, 30, subtract);
  print(result2); // -40
}

typedef Operation = int Function(int x, int y, int z);

// 더하기
int add(int x, int y, int z) => x + y + z;

// 빼기
int subtract(int x, int y, int z) => x - y - z;

// 계산
int calculate(int x, int y, int z, Operation operation) {
  return operation(x, y, z);
}
```
