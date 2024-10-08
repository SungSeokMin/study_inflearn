import 'package:flutter_architecture/domain/model/note.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'notes_event.freezed.dart';

@freezed
class NotesEvent with _$NotesEvent {
  const factory NotesEvent.loadNotes() = LoadNotes;

  const factory NotesEvent.deleteNote(Note note) = DeleteNote;

  const factory NotesEvent.restoreNote() = RestoreNote;
}
