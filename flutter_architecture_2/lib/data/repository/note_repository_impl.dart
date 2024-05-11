import 'package:flutter_architecture/data/data_source/note_db.dart';
import 'package:flutter_architecture/domain/model/note.dart';
import 'package:flutter_architecture/domain/repository/note_repository.dart';

class NoteRepositoryImpl implements NoteRepository {
  final NoteDb db;

  NoteRepositoryImpl(this.db);

  @override
  Future<List<Note>> getNotes() async {
    final notes = await db.getNotes();

    return notes;
  }

  @override
  Future<Note?> getNoteById(int id) async {
    final note = await db.getNoteById(id);

    return note;
  }

  @override
  Future<void> insertNote(Note note) async {
    await db.insertNote(note);
  }

  @override
  Future<void> updateNote(Note note) async {
    await db.updateNote(note);
  }

  @override
  Future<void> deleteNote(Note note) async {
    await db.deleteNote(note);
  }
}
