import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const saveNotesToLocalStorage = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const addNote = (note) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const editExistingNote = (note) => {
    setEditNote(note);
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>Simple Note Taking App</h1>
      <NoteForm addNote={addNote} updateNote={updateNote} editNote={editNote} setEditNote=
      {setEditNote}/>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <NoteList notes={currentNotes} editExistingNote={editExistingNote} deleteNote={deleteNote} />
      <Pagination
        notesPerPage={notesPerPage}
        totalNotes={filteredNotes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;