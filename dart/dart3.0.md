## record (튜플)

개수는 상관없고, 순서와 타입을 보장해준다.

```dart
void main() {
  final result = nameAndAge({'name': '성석민', 'age': 28});
  print(result); // (성석민, 28)
  print('${result.$1}, type is: ${result.$1.runtimeType}'); // 성석민, type is: String
  print('${result.$2}, type is: ${result.$2.runtimeType}'); // 28, type is: int

  final result2 = getNewJeansWithType();
  for (final item in result2) {
    print(item.$1); // 민지, 해린
    print(item.$2); // 20, 18
  }

  final result3 = getNewJeansWithType2();
  for (final item in result3) {
    print(item.$1); // 민지, 해린
    print(item.$2); // 20, 18
  }

  final result4 = getNewJeansWithType3();
  for (final item in result4) {
    print(item.name); // 민지, 해린
    print(item.age); // 20, 18
  }
}

// Record
(String, int) nameAndAge(Map<String, dynamic> json) {
  return (json['name'], json['age']);
}

// key는 String 이지만, value는 String or int 이다.
List<Map<String, dynamic>> getNewJeans() {
  return [
    {'name': '민지', 'age': 20},
    {'name': '해린', 'age': 18},
  ];
}

// key는 String이고, value는 int 이다.
List<(String, int)> getNewJeansWithType() {
  return [
    ('민지', 20),
    ('해린', 18),
  ];
}

// key와 value의 이름을 붙여준다.
List<(String name, int age)> getNewJeansWithType2() {
  return [
    ('민지', 20),
    ('해린', 18),
  ];
}

// 실제로 key - value의 쌍을 이룬다.
List<({String name, int age})> getNewJeansWithType3() {
  return [
    (name: '민지', age: 20),
    (name: '해린', age: 18),
  ];
}
```

## 구조 분해 할당(destructuring)

```dart
void main() {
  final (name, age) = ('민지', 20);
  print('name: $name, age: $age'); // name: 민지, age: 20

  final newJeans = ['민지', '해린'];
  final [a, b] = newJeans;
  print('a: $a, b: $b'); // a: 민지, b: 해린

  final [String c, String d] = newJeans;
  print('c: $c, d: $d'); // c: 민지, d: 해린

  // ...spread operator
  final numbers = [1,2,3,4,5,6,7,8,9];

  final[x, y, ..., z] = numbers;
  print('x: $x, y: $y, z: $z'); // x: 1, y: 2, z: 9

  final[xx, yy, ...rest, zz] = numbers;
  print('xx: $xx, yy: $yy, zz: $zz'); // xx: 1, yy: 2, zz: 9
  print('rest: $rest'); // rest: [3, 4, 5, 6, 7, 8]

  // ignore
  final[xxx, _, yyy, ...rest2, zzz, _] = numbers;
  print('xxx: $xxx, yyy: $yyy, zzz: $zzz'); // xxx: 1, yyy: 3, zzz: 8
  print('rest2: $rest2'); // rest2: [4, 5, 6, 7];

  final minJiMap = {'name': '민지', 'age': 19};
  final {'name': name2, 'age': age2} = minJiMap;
  print('name2: $name2, age2: $age2'); // name2: 민지, age2: 19
}
```

class 구조 분해 할당

```dart
void main() {
  final Idol(name: name, age: age) = Idol(name: '민지', age: 19);
  print('name: $name, age: $age'); // name: 민지, age: 19
}

class Idol {
  final String name;
  final int age;

  Idol({
    required this.name,
    required this.age,
  });
}
```

## class keyword

### final

final로 클래스를 선언하면  
extends, implement, 또는 mixin으로 사용이 불가능하다. (단, 같은 파일은 가능하다.)

```dart
final class Person {
  final String name;
  final int age;

  Person({
    required this.name,
    required this.age,
  });
}
```

### base

base로 클래스를 선언하면  
extends는 가능하지만, implement는 불가능하다.  
단, base, sealed, final로 선언된 클래스는 extends 가능하다.

```dart
base class Person {
  final String name;
  final int age;

  Person({
    required this.name,
    required this.age,
  });
}

base class Idol1 extends Person {}
sealed class Idol2 extends Person {}
final class Idol3 extends Person {}
```

### interface

interface로 선언하면 implement만 가능하다.

```dart
interface class Person {
  final String name;
  final int age;

  Person2({
    required this.name,
    required this.age,
  });
}

class Idol implements Person {}
```

### sealed

sealed 클래스는 abstract이면서 final이다.  
그리고 패턴매칭을 사요 할 수 있도록 해준다.

```dart
sealed class Person {}

class Idol extends Person {}
class Engineer extends Person {}
class Chef extends Person {}

String whoIsHe(Person person) => switch (person) {
      Idol i => '아이돌',
      Engineer e => '엔지니어',
      // Chef 케이스를 적지 않으면 오류가 난다. error: The type 'Person' is not exhaustively matched by the switch cases since it doesn't match 'Chef()'.
      Chef c => '쉐프',
      _ => '나머지',
    };
```
