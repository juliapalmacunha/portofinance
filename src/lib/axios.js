import axios from 'axios';

export const api = axios.create({
  //coloca a url da sua api
  baseURL: 'http://localhost:8080',
});
