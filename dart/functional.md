## spread operator

여러개의 리스트를 하나로 합친다.

```dart
void main() {
  List<int> even = [2, 4, 6, 8];
  List<int> odd = [1, 3, 5, 7];

  List<int> concat = [...even, ...odd];
  print(concat);
}
```

## 형 변환

Map <-> List <-> Set

```dart
void main() {
  List<String> blackPink = ['로제', '지수', '리사', '제니'];

  Map<int, String> blackPinkAsMap = blackPink.asMap();
  print(blackPinkAsMap); // {0: 로제, 1: 지수, 2: 리사, 3: 제니}
  print(blackPinkAsMap.keys.toList()); // [0, 1, 2, 3]
  print(blackPinkAsMap.values.toList()); // [로제, 지수, 리사, 제니]

  // Set.from() == List.toSet()
  Set<String> blackPinkToSet = blackPink.toSet();
  print(blackPinkToSet); // {로제, 지수, 리사, 제니}
  print(blackPinkToSet.toList()); // [로제, 지수, 리사, 제니]
}
```

## split

- 사용 가능: String

```dart
void main() {
  String number = '13579';

  final parsed = number.split('');
  print(parsed); // [1, 3, 5, 7, 9]
}
```

## map

새로운 Iterable를 반환한다.

- 사용 가능: List & Map & Set

```dart
void main() {
  List<String> blackPink = ['로제', '지수', '리사'];

  final newBlackPink = blackPink.map((x) {
    return '블랙핑크 $x';
  }).toList();

  print(newBlackPink); // [블랙핑크 로제, 블랙핑크 지수, 블랙핑크 리사]

  final newBlackPink2 = blackPink.map((x) => '블랙핑크 $x');
  print(newBlackPink2); // (블랙핑크 로제, 블랙핑크 지수, 블랙핑크 리사)
  print(newBlackPink2.toList()); // [블랙핑크 로제, 블랙핑크 지수, 블랙핑크 리사]

  print(newBlackPink == newBlackPink2); // false
}
```

## where

조건에 맞는 요소를 Iterable로 반환한다.

- 사용 가능: List & Set

```dart
void main() {
  List<Map<String, String>> people = [
    {'name': '로제', 'group': '블랙핑크'},
    {'name': '리사', 'group': '블랙핑크'},
    {'name': '지수', 'group': '블랙핑크'},
    {'name': '뷔', 'group': 'BTS'},
  ];

  final blackPink = people.where((x) => x['group'] == '블랙핑크');
  print(blackPink); // ({name: 로제, group: 블랙핑크}, {name: 리사, group: 블랙핑크}, {name: 지수, group: 블랙핑크})

  final bts = people.where((x) => x['group'] == 'BTS');
  print(bts); // ({name: 뷔, group: BTS})
}
```

## reduce

List의 타입을 지키면서 각 요소를 기존 값과 반복적으로 결합한다.

- 사용 가능: List & Set

```dart
void main() {
  List<int> numbers = [1, 3, 5, 7, 9];

  final sum = numbers.reduce((acc, cur) {
    print('--------');
    print('acc: $acc');
    print('cur: $cur');
    print('total: ${acc + cur}');

    return acc + cur;
  });

  print(sum);
  /*
  --------
  acc: 1
  cur: 3
  total: 4
  --------
  acc: 4
  cur: 5
  total: 9
  --------
  acc: 9
  cur: 7
  total: 16
  --------
  acc: 16
  cur: 9
  total: 25
  */

  List<String> strings = ['1', '3', '5', '7', '9'];

  // strings.reduce의 반환 값은 List<String> 이어야 하지만, 아래의 결과는 int이기 때문에 오류가 난다.
  final lengthTotal = strings.reduce((acc, cur) => acc.length + cur.length); // error: The return type 'int' isn't a 'String', as required by the closure's context.
}
```

## fold

List의 타입을 지키지 않고 각 요소를 기존 값과 반복적으로 결합한다.

- 사용 가능: List & Set

```dart
void main() {
  List<String> words = [
    '안녕하세요 ',
    '저는 ',
    '성석민입니다.'
  ];

  final wordsLength = words.fold<int>(0, (acc, cur) => acc + cur.length);
  print(wordsLength); // 16

  final sentence = words.fold('', (acc, cur) => acc + cur);
  print(sentence); // 안녕하세요 저는 성석민입니다.
}
```
