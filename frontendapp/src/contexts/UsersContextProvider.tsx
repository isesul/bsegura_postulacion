import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/user";


// default Users context
export const UsersContext = createContext({
  users: [],
  saveUsers: (users: User[]) => {},
  getUsers: () => {},
  updateOneUser: (user: User) => {}
});

interface UsersProviderProps {
  children: React.ReactNode;
}

export function UsersContextProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<any>();

  function saveUsers(users: User[]) {
    setUsers(users);
  }

  function getUsers(): User[] | undefined {
    return users;
  }

  function updateOneUser(user: User){
    const list_users: User[] = users;
    let idx = list_users.findIndex(((obj:any) => obj.id === user?.id));
    list_users[idx] = user;
    setUsers(list_users);
  }

  useEffect(()=>{
  }, [users])

  return (
    <UsersContext.Provider value={{users, saveUsers, getUsers, updateOneUser}}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);

/**
 * CurrentUserContext
 */
export const CurrentUserContext = createContext({
  currentUser: null,
  saveCurrentUser: (currentUser: User | null) => {},
  getCurrentUser: () => {}
});

interface CurrentUsersProviderProps {
  children: React.ReactNode;
}

/**
 * CurrentUserContextProvider
 * @param children
 */
export const CurrentUserContextProvider = ({ children }: UsersProviderProps) => {
  
  const [currentUser, setCurrentUser] = useState<any>();

  function saveCurrentUser(currentUser: User | null){
    setCurrentUser(currentUser);
  }

  function getCurrentUser(){
    return currentUser;
  }

  useEffect(()=>{
  }, [currentUser])

  return (
    <CurrentUserContext.Provider value={{currentUser,  saveCurrentUser, getCurrentUser}}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUser = () => useContext(CurrentUserContext);