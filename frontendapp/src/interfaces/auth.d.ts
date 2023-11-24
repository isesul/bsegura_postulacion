export interface IAuthUser {
    username: string
    password: string
}

export interface AuthResponse {
    token: string
}

export interface AuthLogoutResponse {
  status: string
}

export interface AuthErrorResponse {
  type: string
  title: string
  status: number
  errors:{
    [key: string]: string | undefined
  }
  traceId: string
}

export interface AccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  };
  error?: string;
}

export interface AuthContextResponse {
  username: string
  token: string
}
