import React from 'react';

const NoteItem = ({ note, editExistingNote, deleteNote }) => {
  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <small>{note.timestamp}</small>
      <button onClick={() => editExistingNote(note)}>Edit</button>
      <button onClick={() => deleteNote(note.id)}>Delete</button>
    </div>
  );
};

export default NoteItem;