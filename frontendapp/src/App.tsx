import { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [number, setNumber] = useState<number|string>(5)

  return (
    <div className="container">

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">User CRUD</a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">List</a>
              <a className="nav-link" href="#">Create</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="App">
        <UserForm></UserForm>
        <UserList></UserList>
      </div>
    </div>

  );
}

export default App;
