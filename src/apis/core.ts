import axios from 'axios';

export const BASE_URL = 'http://localhost:4000/';
//axios instance
const instance = (url: string) => {
  return axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const api = instance(BASE_URL);