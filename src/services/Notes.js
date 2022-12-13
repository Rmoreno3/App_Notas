import axios from "axios";

//const API = "https://api-backend-rouge.vercel.app/api/notes";
const API = "http://localhost:3001/api/notes";

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllNotes =  () => {
  const request =  axios.get(API)
  return request.then(response => response.data)
};

const createNote = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.post(API, newObject, config)
  return request.then(response => response.data)
};

const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.put(`${API}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export { getAllNotes, createNote, update, setToken };
