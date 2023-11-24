import { AxiosResponse } from "axios";
import http from "../http-common";
import {AuthErrorResponse, AuthLogoutResponse, AuthResponse, IAuthUser} from "../interfaces/auth";

class LoginService {
  login(credentials: IAuthUser) {
    return http.post<AuthResponse|AuthErrorResponse>("Authentication/Auth", credentials);
  }

  /**
   * Temporal function
   * validate current token
   */
  async refresh(token: string): Promise<AuthResponse> {
    const obj_response = { token: token } as AuthResponse;
    return Promise.resolve(obj_response)
  }

  /**
   * Temporal function
   * logout action backend 
   * destroy token
   */
  async logout(token: string): Promise<AuthLogoutResponse> {
    const obj_response = { status: "ok" } as AuthLogoutResponse;
    return Promise.resolve(obj_response)
  }
}

export default new LoginService();
