import axios from 'axios';

const baseURL = "http://localhost:4000"; //"https://calendar-a5id.onrender.com"

const instance = axios.create({
  baseURL: baseURL,

});

export default instance;
