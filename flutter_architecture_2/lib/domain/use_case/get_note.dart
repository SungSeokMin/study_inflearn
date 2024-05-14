import 'package:flutter_architecture/data/repository/note_repository_impl.dart';
import 'package:flutter_architecture/domain/model/note.dart';

class GetNote {
  final NoteRepositoryImpl repository;

  GetNote({
    required this.repository,
  });

  Future<Note?> call(int id) async {
    return await repository.getNoteById(id);
  }
}
