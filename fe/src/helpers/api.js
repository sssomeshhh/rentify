import aio from "axios";

const apiUrl = "http://localhost:8080";

const apiRequest = async (method, path, options) => {
  let url = apiUrl + path;
  return await aio({ method, url, ...options })
};

export { apiRequest };
