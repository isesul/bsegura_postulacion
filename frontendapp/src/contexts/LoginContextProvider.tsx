import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextResponse, AuthErrorResponse, AuthResponse, IAuthUser } from "../interfaces/auth";
import LoginService from '../services/auth';
import { AxiosResponse } from "axios";

export const LoginContext = createContext({
  isAuthenticated: false,
  getAccessToken: async (credentials: IAuthUser): Promise<any> => {},
  getAuthUser: () => {},
  getAuthToken: () => {},
  saveAuthUser: (_username: string) => {},
  logout: () => {}
});

interface LoginProviderProps {
  children: React.ReactNode;
}

export function LoginContextProvider({ children }: LoginProviderProps) {
  const [authUser, setAuthUser] = useState<string | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    
  /**
   * checkStatusResponseAuth
   * Check the response of the LoginService
   * * Response requirements:
   *  - - HTTP Status 200.
   *  - - Token cannot be empty.
   *  - - Data cannot contain Error.
   */
  function checkStatusResponseAuth(response: AxiosResponse<AuthResponse | AuthErrorResponse>){
    // Data cannot contain Error.
    try {
      if((response.data as AuthErrorResponse).errors){
        const errors = (response.data as AuthErrorResponse).errors;
        const str_errors = JSON.stringify(errors);
        throw Error(str_errors);
      }
    } catch (error) {
      console.log(error);
    }
  
    // Token cannot be empty.
    if((response.data as AuthResponse).token) {
      const tmp_token = (response.data as AuthResponse).token;
      if(tmp_token === "" || tmp_token === undefined || tmp_token === null){
        throw Error("Bad Request,  I couldn't get a token");
      }
    }
  
    // HTTP Status 200
    if(response.status !== 200){
      throw Error("Bad Request");
    }
  
    return {"token": (response.data as AuthResponse).token} as AuthResponse;
  }

  async function getAccessToken(credentials: IAuthUser): Promise<AuthContextResponse> {
    const request = await LoginService.login(credentials);

    const _token = checkStatusResponseAuth(request);
    
    saveToken(_token.token);
    saveAuthUser(credentials.username);
    setIsAuthenticated(true);

    const data_response: AuthContextResponse = {
      username: credentials.username,
      token: _token.token
    }

    return data_response;
  }

  function getAuthUser(){
    const _username = localStorage.getItem("username");
    return _username as string;
  }

  function getAuthToken(){
    const _token = localStorage.getItem("token");
    return _token;
  }

  function saveToken(_token: string){
    setToken(_token);
    localStorage.setItem("token", _token);
  }

  function saveAuthUser(_username: string){
    setAuthUser(_username);
    localStorage.setItem("username", _username);
  }

  async function logout(){
    if(localStorage.getItem("token") !== null){
      const _token = localStorage.getItem("token") as string;
      const logout = await LoginService.logout(_token);
      localStorage.removeItem("username");
      localStorage.removeItem("token");

      saveToken("");
      saveAuthUser("");
      setIsAuthenticated(false);

      return logout;
    }
  }

  async function refreshToken(){
    if(localStorage.getItem("token")){ // if : token from localStorage.
      const _token = localStorage.getItem("token") as string;
      const _username = localStorage.getItem("username") as string;
      const validate = await LoginService.refresh(_token); // check token
      
      if(validate){
        saveToken(_token);
        saveAuthUser(_username);
        setIsAuthenticated(true);
      }
    } // else : token from localStorage is empty.
  }

  useEffect(()=>{
    refreshToken();
  });

  return (
    <LoginContext.Provider value={{isAuthenticated, getAccessToken, getAuthUser, getAuthToken, saveAuthUser, logout}}>
      {children}
    </LoginContext.Provider>
  );
}


export const useAuth = () => useContext(LoginContext);