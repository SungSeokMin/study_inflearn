import 'package:flutter/material.dart';
import 'package:flutter_architecture/domain/model/note.dart';
import 'package:flutter_architecture/domain/repository/note_repository.dart';
import 'package:flutter_architecture/presentation/notes/notes_event.dart';
import 'package:flutter_architecture/presentation/notes/notes_state.dart';

class NotesViewModel with ChangeNotifier {
  final NoteRepository repository;

  NotesViewModel({
    required this.repository,
  });

  NotesState _state = NotesState(notes: []);

  NotesState get state => _state;

  Note? _recentlyDeletedNote;

  void onEvent(NotesEvent event) {
    event.when(
      loadNotes: _loadNotes,
      deleteNote: _deleteNote,
      restoreNote: _restoreNote,
    );
  }

  Future<void> _loadNotes() async {
    List<Note> notes = await repository.getNotes();
    _state = _state.copyWith(notes: notes);

    notifyListeners();
  }

  Future<void> _deleteNote(Note note) async {
    await repository.deleteNote(note);

    _recentlyDeletedNote = note;

    await _loadNotes();
  }

  Future<void> _restoreNote() async {
    if (_recentlyDeletedNote != null) {
      await repository.insertNote(_recentlyDeletedNote!);
      _recentlyDeletedNote = null;

      _loadNotes();
    }
  }
}
