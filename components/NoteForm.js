import React, { useState, useEffect } from 'react';

const NoteForm = ({ addNote, updateNote, editNote, setEditNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editNote) {
      const updatedNote = { ...editNote, title, content, timestamp: new Date().toLocaleString() };
      updateNote(updatedNote);
      setEditNote(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        timestamp: new Date().toLocaleString()
      };
      addNote(newNote);
    }
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">{editNote ? 'Update Note' : 'Add Note'}</button>
    </form>
  );
};

export default NoteForm;