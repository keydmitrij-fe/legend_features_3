import { api } from '../api/http.ts';
import { AxiosResponse } from 'axios';
import { Profile } from '../types/authTypes.ts';

export const getProfile = (): Promise<AxiosResponse<Profile>> => {
  return api('/user/profile');
};
