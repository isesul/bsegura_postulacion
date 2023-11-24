import { useState, createContext, useContext } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';

import {User, IUserList} from "./interfaces/user";
import Dashboard from './components/Dashboard';
import {UsersContextProvider, CurrentUserContextProvider, UsersContext} from './contexts/UsersContextProvider';
import { LoginContextProvider } from './contexts/LoginContextProvider';



function App() {
  
  return (
    <div className="container">

      <div className="App">

      <LoginContextProvider>
        <UsersContextProvider>
          <CurrentUserContextProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route path="dashboard" element={<Dashboard  />} />

                <Route path="create" element={<UserForm />} />
              </Routes>
            </BrowserRouter>
          </CurrentUserContextProvider>
        </UsersContextProvider>
      </LoginContextProvider>

      </div>
    </div>

  );
}

export default App;
