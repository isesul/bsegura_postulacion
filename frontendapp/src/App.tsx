import { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [number, setNumber] = useState<number|string>(5)

  return (
    <div className="container">

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">User CRUD</a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="/list">List</a>
              <a className="nav-link" href="/create">Create</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="create" element={<UserForm />} />
          <Route path="list" element={<UserList  />} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>

  );
}

export default App;
