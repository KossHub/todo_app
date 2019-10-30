import axios from 'axios';

const queryInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

export const queryGet = (url) => {
  return queryInstance.get(url);
};
export const queryPost = (url, data) => {
  return queryInstance.post(url, data);
};
export const queryDelete = (url, data) => {
  return queryInstance.delete(url, data);
};
export const queryPut = (url, data) => {
  return queryInstance.put(url, data);
};
