import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, editExistingNote, deleteNote }) => {
  return (
    <div className="note-list">
      {notes.map(note => (
        <NoteItem key={note.id} note={note} editExistingNote={editExistingNote} deleteNote={deleteNote} />
      ))}
    </div>
  );
};

export default NoteList;