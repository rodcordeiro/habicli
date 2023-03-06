import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { iTag } from './interfaces';

const api: AxiosInstance = axios.create({
  baseURL: 'https://habitica.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getTags(headers: { [k: string]: any }) {
  return await api
    .get<
      any,
      AxiosResponse<{
        success: boolean;
        data: iTag[];
        userV: number;
        appVersion: string;
      }>
    >(`/tags`, {
      headers,
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
}

export default api;
