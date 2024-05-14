import 'package:flutter_architecture/data/repository/note_repository_impl.dart';
import 'package:flutter_architecture/domain/model/note.dart';

class DeleteNote {
  final NoteRepositoryImpl repository;

  DeleteNote({
    required this.repository,
  });

  Future<void> call(Note note) async {
    await repository.deleteNote(note);
  }
}
