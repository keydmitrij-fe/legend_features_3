import axios from 'axios';
import { tokenManager } from '../helpers/tokenManager.ts';
import { Token } from '../types/authTypes.ts';

export const API_URL = 'https://easydev.club/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const refresh = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    const response = await axios.post<Token>(`${API_URL}/auth/refresh`, {
      refreshToken: token,
    });
    tokenManager.setToken(response.data.accessToken);
    localStorage.setItem('token', response.data.refreshToken);

    return tokenManager.getToken();
  }
};

if (!tokenManager.getToken()) {
  await refresh();
}

api.interceptors.request.use(
  (config) => {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${tokenManager.getToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;

    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;

      try {
        const newAccessToken = await refresh();
        prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return api(prevRequest);
      } catch {
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  },
);
