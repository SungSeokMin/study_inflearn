import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'photo.g.dart';

@JsonSerializable()
class Photo extends Equatable {
  final int id;
  @JsonKey(name: 'previewURL')
  final String previewUrl;
  final String tags;

  const Photo({
    required this.id,
    required this.previewUrl,
    required this.tags,
  });

  factory Photo.fromJson(Map<String, dynamic> json) => _$PhotoFromJson(json);

  Map<String, dynamic> toJson() => _$PhotoToJson(this);

  @override
  List<Object?> get props => [id];
}
