import { AxiosResponse } from 'axios';
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

export { authenticate };
