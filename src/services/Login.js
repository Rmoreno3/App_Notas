import axios from 'axios'

//const API = "https://api-backend-rouge.vercel.app/api/login";
const API = "http://localhost:3001/api/login";

const login = async (credentials) => {
  const { data } = await axios.post(API, credentials)
  return data
}

export default  login 