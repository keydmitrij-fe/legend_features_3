import {
  AuthData,
  Profile,
  Token,
  UserRegistration,
} from '../types/authTypes.ts';
import { AxiosResponse } from 'axios';
import { api } from '../api/http.ts';

export const login = (authData: AuthData): Promise<AxiosResponse<Token>> => {
  return api.post('/auth/signin', authData);
};

export const register = (
  userRegistration: UserRegistration,
): Promise<AxiosResponse<Profile>> => {
  return api.post('/auth/signup', userRegistration);
};

export const logout = () => {
  return api.post('/user/logout');
};
