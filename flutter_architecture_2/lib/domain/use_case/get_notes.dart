import 'package:flutter_architecture/data/repository/note_repository_impl.dart';
import 'package:flutter_architecture/domain/model/note.dart';

class GetNotes {
  final NoteRepositoryImpl repository;

  GetNotes({
    required this.repository,
  });

  Future<List<Note>> call() async {
    List<Note> notes = await repository.getNotes();

    return notes;
  }
}
