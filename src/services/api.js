// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hubeau.eaufrance.fr/api/v1/temperature',
});

export default instance;
