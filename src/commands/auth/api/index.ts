import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { iAuthenticatedUser, iHeaders } from '../../../utils';
import api from '../../../utils/api';
import { iAuthenticated } from './interfaces';

const authenticate = async (username: string, password: string) => {
  return await api
    .post<any, AxiosResponse<iAuthenticated>>('/user/auth/local/login', {
      username,
      password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error(err);
    });
};

const getAuthenticatedUser = async (
  headers: AxiosRequestHeaders & iHeaders,
) => {
  return await api
    .get<iAuthenticatedUser>('/user', { headers })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export { authenticate, getAuthenticatedUser };
