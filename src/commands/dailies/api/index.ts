import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { iHeaders } from '../../../utils';
import api from '../../../utils/api';
import { iDailyResponse, ICreateDailyProps } from './interface';

export async function getDailies(headers: AxiosRequestHeaders & iHeaders) {
  return await api
    .get<any, AxiosResponse<iDailyResponse>>('/tasks/user?type=dailys', {
      headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err: Error) => {
      throw err;
    });
}

export async function create(
  daily: ICreateDailyProps,
  headers: AxiosRequestHeaders & iHeaders,
) {
  return await api
    .post(
      '/tasks/user',
      {
        ...daily,
        type: 'daily',
      },
      { headers },
    )
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
}
