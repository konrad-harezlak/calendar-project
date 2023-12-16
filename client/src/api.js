import axios from 'axios';

const baseURL = "https://calendar-a5id.onrender.com" //"http://localhost:4000";

const instance = axios.create({
  baseURL: baseURL,

});

export default instance;
