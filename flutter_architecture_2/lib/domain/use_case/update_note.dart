import 'package:flutter_architecture/data/repository/note_repository_impl.dart';
import 'package:flutter_architecture/domain/model/note.dart';

class UpdateNote {
  final NoteRepositoryImpl repository;

  UpdateNote({
    required this.repository,
  });

  Future<void> call(Note note) async {
    await repository.updateNote(note);
  }
}
