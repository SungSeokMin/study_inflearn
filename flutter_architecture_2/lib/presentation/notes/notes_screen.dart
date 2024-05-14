import 'package:flutter/material.dart';
import 'package:flutter_architecture/domain/model/note.dart';
import 'package:flutter_architecture/presentation/notes/widget/note_item.dart';
import 'package:flutter_architecture/ui/colors.dart';

class NotesScreen extends StatelessWidget {
  const NotesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: false,
        title: const Text(
          'Your note',
          style: TextStyle(
            fontSize: 32,
          ),
        ),
        elevation: 0,
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.sort),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        shape: const CircleBorder(),
        child: const Icon(Icons.add),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: ListView(
          children: [
            NoteItem(
              note: Note(
                title: 'test',
                content: 'test',
                color: roseBud.value,
                timestamp: 1,
              ),
              onDeleteTap: () {
                print('[notes_screen.dart, 45] : hi');
              },
            ),
            NoteItem(
              note: Note(
                title: 'test',
                content: 'test',
                color: skyBlue.value,
                timestamp: 1,
              ),
              onDeleteTap: () {},
            )
          ],
        ),
      ),
    );
  }
}
