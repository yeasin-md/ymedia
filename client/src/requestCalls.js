import axios from 'axios';
import { useSelector } from 'react-redux';

const BASE_URL = 'https://ymedia-backend-api.herokuapp.com/api';
// export const BASE_URL = 'http://localhost:5000/api';
// console.log(BASE_URL);
// const TOKEN = "";
// const TOKEN = localStorage.getItem('tokencall');
// console.log('tokenreqq', TOKEN);

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//   .currentUser?.accessToken;
// console.log(TOKEN);
// console.log('tokenreqq', TOKEN);

// console.log(`token`, TOKEN);
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  // headers: { token: `Bearer ${TOKEN}` },
  // Accept: "application/json, text/plain, *",
});
