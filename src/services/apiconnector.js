import axios from "axios";

export const axiosInstance = axios.create({});

const apiConnector = (method, url, bodyData, headers = {}, params = {}) => {
  return axiosInstance({
    method,
    url,
    data: bodyData || null,
    headers,
    params,
  });
};

export default apiConnector;
