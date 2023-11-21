import { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [number, setNumber] = useState<number|string>(5)

  return (
    <div className="App">

      <UserForm></UserForm>
      <UserList></UserList>
    </div>
  );
}

export default App;
