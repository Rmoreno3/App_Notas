import Note from "./Note";
import { useEffect, useState } from "react";
import { getAllNotes, createNote, setToken } from "./services/Notes";
import login  from "./services/Login"
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleChange = (e) => {
    setNewNote(e.target.value)
  };

  const addNote = (e) => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    };

    createNote(noteObject)
      .then((data) => {
        setNotes(([...notes]) => notes.concat(data))
      })
      .catch((error) => {
        console.log("Ocurrio un error mi llave: ", error);
      });
    setNewNote('');
  };

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
       const user = await login({
      username,
      password
    })

    window.localStorage.setItem(
      'loggedNoteAppUser', JSON.stringify(user)
    )

    setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    } catch (error) {
      console.log(error)
    }

   
  }

  const handleLogout =  (e) => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  return (
    <div className="App">
      <h1>Notes app</h1>

     {user 
      ?
     <div>
        <h2>Crear Nota</h2>
        <form onSubmit={addNote}>
          <input
            type="text"
            placeholder="contenido"
            value={newNote}
            onChange={handleChange}
          />
          <button>Crear Nota</button>
          <div>
            <button onClick={handleLogout}>cerrar secion</button>
          </div>
        </form>
      </div>
      :
       <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input 
              type="text"
              value={username}
              name="Username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input 
              type="password"
              value={password}
              name="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>
            Login
          </button>
        </form>
      </div>
     }
 
      {loading ? "Cargando" : ""}
      <h3>Notas</h3>
      <ol>
        {notes.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </ol>
    </div>
  );
}

export default App;
