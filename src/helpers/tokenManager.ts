const createManagerToken = () => {
  let token: string | null = null;

  return {
    setToken: (newToken: string) => {
      token = newToken;
    },
    getToken: () => {
      return token;
    },
    clearToken: () => {
      token = null;
    },
  };
};

export const tokenManager = createManagerToken();
