export interface LoginBody {
  email: string;
  password: string;
}

export interface TokenPayload {
  sub: number;
  tenant: number;
  role: string;
}

export interface AuthTokenResponse {
  token: string;
}