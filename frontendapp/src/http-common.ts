import axios from "axios";

export const API_URL = 'http://localhost:3050/api'

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});
