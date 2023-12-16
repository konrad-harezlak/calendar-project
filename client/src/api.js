import axios from 'axios';

const baseURL = "https://calendar-a5id.onrender.com";

const instance = axios.create({
  baseURL: baseURL,

});

export default instance;
