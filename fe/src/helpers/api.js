import aio from "axios";

const apiUrl = location.origin + '/api';

const apiRequest = async (method, path, options) => {
  let url = apiUrl + path;
  return await aio({ method, url, ...options })
};

export { apiRequest };
