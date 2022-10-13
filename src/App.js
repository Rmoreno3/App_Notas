import Note from "./Note";
import { useEffect, useState } from "react";
import { getAllNotes, createNote } from "./services/notes/serviceNotes";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getAllNotes()
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("OCURRIO UN ERROR", error);
      });
  }, []);

  const handleChange = (e) => {
    setNewNote(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const noteToAddToState = {
      content: newNote,
    };

    createNote(noteToAddToState)
      .then((data) => {
        setNotes(([...notes]) => notes.concat(data));
      })
      .catch((error) => {
        console.log("Ocurrio un error mi llave: ", error);
      });
    setNewNote('');
  };

  return (
    <div className="App">
      <h2>Notes</h2>
      {loading ? "Cargando" : ""}
      <ol>
        {notes.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </ol>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="contenido"
          value={newNote}
          onChange={handleChange}
        />
        <button>Crear Nota</button>
      </form>
    </div>
  );
}

export default App;
