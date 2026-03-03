class createManagerToken {
  private token: string | null = null;

  public setToken(newToken: string) {
    this.token = newToken;
  }

  public getToken(): string | null {
    return this.token;
  }

  public clearToken() {
    this.token = null;
  }
}

export const tokenManager = new createManagerToken();
