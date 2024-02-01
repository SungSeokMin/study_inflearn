## class 선언

```dart
void main() {
  Idol blackPink = Idol('블랙핑크', ['지수', '제니', '리사', '로제']);
  blackPink.sayHello();

  Idol bts = Idol('BTS', ['RM', '진', '슈가', '제이홉', '지민', '뷔', '정국']);
  bts.sayHello();
}

// Idol class
class Idol {
  final String name;
  final List<String> members;

  Idol(this.name, this.members);

  void sayHello() {
    print('안녕하세요 $name입니다.');
  }

  void introduce() {
    print('저희 멤버는 $members가 있습니다.');
  }
}
```

## class 인스턴스 비교

```dart
void main() {
  Idol blackPink = Idol('블랙핑크', ['지수', '제니', '리사', '로제']);
  Idol blackPink1 = Idol('블랙핑크', ['지수', '제니', '리사', '로제']);

  // 같은 인스턴스 같지만 메모리에 각각의 인스턴스가 저장된다.
  print(blackPink == blackPink1); // false
}

// Idol class
class Idol {
  final String name;
  final List<String> members;

  Idol(this.name, this.members);

  void sayHello() {
    print('안녕하세요 $name입니다.');
  }

  void introduce() {
    print('저희 멤버는 $members가 있습니다.');
  }
}
```

하지만 같은 메모리에 저장할 수 있는 방법이 있는데, const 키워드를 사용하면 된다.

```dart
void main() {
  //               ⬇️
  Idol blackPink = const Idol('블랙핑크', ['지수', '제니', '리사', '로제']);
  //                ⬇️
  Idol blackPink1 = const Idol('블랙핑크', ['지수', '제니', '리사', '로제']);

  print(blackPink == blackPink1); // true
}

// Idol class
class Idol {
  final String name;
  final List<String> members;

  // ⬇️
  const Idol(this.name, this.members);

  void sayHello() {
    print('안녕하세요 $name입니다.');
  }

  void introduce() {
    print('저희 멤버는 $members가 있습니다.');
  }
}

```

## getter / setter

- getter: 데이터를 가져온다.
- setter: 데이터를 변경한다.

```dart
void main() {
  Idol blackPink = Idol('블랙핑크', ['지수', '제니', '리사', '로제']);
  print(blackPink.firstMember); // 지수

  blackPink.firstMember = '석민';
  print(blackPink.firstMember); // 석민

  Idol bts = Idol('BTS', ['RM', '진', '슈가', '제이홉', '지민', '뷔', '정국']);
  print(bts.firstMember); // RM

  bts.firstMember = '석민';
  print(bts.firstMember); // 석민
}

// Idol class
class Idol {
  String name;
  List<String> members;

  Idol(this.name, this.members);

  String get firstMember {
    return this.members[0];
  }

  set firstMember(String name) {
    this.members[0] = name;
  }
}
```

## class 상속(inheritance)

상속을 받으면 부모 클래스의 모든 속성을 자식 클래스가 부여받는다.

```dart
void main() {
  BoyGroup bts = BoyGroup('BTS', 7);

  GirlGroup blackPink = GirlGroup('블랙핑크', 4);
}

class Idol {
  String name;
  int membersCount;

  Idol({
    required this.name,
    required this.membersCount,
  });

  void sayName(String name) {
    print('저는 $name입니다.');
  }

  void sayMemberCount() {
    print('$name은 $membersCount명의 멤버가 있습니다.');
  }
}

class BoyGroup extends Idol {
  BoyGroup(String name, int membersCount)
      : super(name: name, membersCount: membersCount);

  // 메소드를 추가할 수 있다.
  void sayMale() {
    print('저희는 남자 아이돌입니다.');
  }
}

class GirlGroup extends Idol {
  GirlGroup(String name, int membersCount)
      : super(name: name, membersCount: membersCount);

  // 메소드를 추가할 수 있다.
  void sayFemale() {
    print('저희는 여자 아이돌입니다.');
  }
}

```

## class 상속 타입 비교

부모 class를 상속받은 자식 class는 부모의 타입과 자기 자신의 타입을 갖는다.  
같은 레벨의 자식끼리는 상관관계가 없다.

```dart
void main() {
  Idol idol = Idol(name: '아이돌', membersCount: 0);
  print(idol is Idol); // true
  print(idol is BoyGroup); // false
  print(idol is GirlGroup); // false

  BoyGroup bts = BoyGroup('BTS', 7);
  print(bts is Idol); // true
  print(bts is BoyGroup); // true
  print(bts is GirlGroup); // false

  GirlGroup blackPink = GirlGroup('블랙핑크', 4);
  print(blackPink is Idol); // true
  print(blackPink is BoyGroup); // false
  print(blackPink is GirlGroup); // true
}

class Idol {
  String name;
  int membersCount;

  Idol({
    required this.name,
    required this.membersCount,
  });

  void sayName(String name) {
    print('저는 $name입니다.');
  }

  void sayMemberCount() {
    print('$name은 $membersCount명의 멤버가 있습니다.');
  }
}

class BoyGroup extends Idol {
  BoyGroup(String name, int membersCount)
      : super(name: name, membersCount: membersCount);

  // 메소드를 추가할 수 있다.
  void sayMale() {
    print('저희는 남자 아이돌입니다.');
  }
}

class GirlGroup extends Idol {
  GirlGroup(String name, int membersCount)
      : super(name: name, membersCount: membersCount);

  // 메소드를 추가할 수 있다.
  void sayFemale() {
    print('저희는 여자 아이돌입니다.');
  }
}
```

## method override

```dart
void main() {
  TimesTwo tt = TimesTwo(2);
  print(tt.calculate());

  TimesFour tf = TimesFour(2);
  print(tf.calculate());
}

class TimesTwo {
  final int number;

  TimesTwo(this.number);

  // method
  int calculate() {
    return number * 2;
  }
}

class TimesFour extends TimesTwo {
  TimesFour(int number) : super(number);

  @override
  int calculate() {
    // super = 부모 클래스(TimesTwo)
    return super.calculate() * 2;
  }
}
```

## static

```dart
void main() {
  Employee seokmin = Employee('석민');

  Employee seulgi = Employee('슬기');
}

class Employee {
  static String? building;
  final String name;

  Employee(this.name);

  void printNameAndBuilding() {
    print('제 이름은 $name입니다. $building 건물에서 근무하고 있습니다.');
  }

  static void printBuilding() {
    print('저는 $building 건물에서 근무중입니다.');
  }
}
```

## interface

```dart
void main() {
  BoyGroup bts = BoyGroup('BTS');
  bts.sayName();

  GirlGroup redVelvet = GirlGroup('레드벨벳');
  redVelvet.sayName();

  IdolInterface idol = IdolInterface('아이돌'); // error: Abstract classes can't be instantiated.
}

// 실제로 인스턴스화를 시키지 못하게 abstract 키워드를 작성한다.
abstract class IdolInterface {
  String name;

  IdolInterface(this.name);

  void sayName();
}

class BoyGroup implements IdolInterface {
  @override
  String name;

  BoyGroup(this.name);

  @override
  void sayName() {
    print('제 이름은 $name 입니다.');
  }
}

class GirlGroup implements IdolInterface {
  @override
  String name;

  GirlGroup(this.name);

  @override
  void sayName() {
    print('제 이름은 $name 입니다.');
  }
}
```

## generic

타입을 외부에서 받을 때 사용한다.

```dart
void main() {
  Lecture<String, String> lecture1 = Lecture('1', '성석민');
  lecture1.printTypes(); // id type is: String, name type is: String

  Lecture<int, String> lecture2 = Lecture(2, '성석민');
  lecture2.printTypes(); // id type is: int, name type is: String

  Lecture<String, String> lecture3 = Lecture(2, '성석민'); // error: The argument type 'int' can't be assigned to the parameter type 'String'.
}

class Lecture<T, V> {
  final T id;
  final V name;

  Lecture(this.id, this.name);

  void printTypes() {
    print('id type is: ${id.runtimeType}');
    print('name type is: ${name.runtimeType}');
  }
}
```
