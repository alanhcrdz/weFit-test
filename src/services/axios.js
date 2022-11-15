import  axios  from 'axios';

export const BASE_URL = 'https://api.github.com/users'

export const api = axios.create({
    baseURL: BASE_URL
});