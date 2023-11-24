import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../contexts/LoginContextProvider";
import { IAuthUser } from "../interfaces/auth";

export default function Login() {
  const stateAuth = useAuth();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const isAuthenticated = stateAuth.isAuthenticated;
  const authUsername = stateAuth.getAuthUser() as unknown as string;
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function changeEvent(element: React.ChangeEvent<HTMLInputElement>){
    console.log('changeEvent.element:', element);
    console.log('changeEvent.element.target.name: ', element.target.name);
    switch (element.target.name) {
      case "username":
        setUsername(element.target.value);
        break;
      case "password":
        setPassword(element.target.value);
        break;
    
      default:
        console.error('unknow input name', username);
        break;
    }
  }

  async function submitLogin(){

    console.log('Login.submitLogin.username', username);
    console.log('Login.submitLogin.password', password);

    const credentials: IAuthUser = {
      username: username as string,
      password: password as string
    }
    const req = await stateAuth.getAccessToken(credentials);
    console.log('Login.submitLogin.req: ', req)
  }

  function logout(){
    console.log('Login.logout');
    stateAuth.logout();
  }
  
  return (
    <>
      {isAuthenticated? (
        <>
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
            Hi {authUsername}
          </a>
          <ul className="dropdown-menu">
            <li style={{cursor: "pointer"}}><a className="dropdown-item" onClick={logout}>Logout</a></li>
          </ul>
        </>
      ):(
        <>
          <button className='btn' onClick={handleShow}>
            Sign In
          </button>
          <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>
              <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="form-outline mb-4">
                <input
                  id="sign-in-username"
                  value={username}
                  name="username"
                  onChange={element => changeEvent(element)}
                  type="text"
                  className="form-control" />
                <label className="form-label" htmlFor="username">Username</label>
              </div>
              <div className="form-outline mb-4">
                <input
                  id="sign-in-password"
                  value={password}
                  name="password"
                  onChange={element => changeEvent(element)}
                  type="password"
                  className="form-control" />
                <label className="form-label" htmlFor="password">Password</label>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={submitLogin}>
                Sign in
              </Button>
            </Modal.Footer>

          </Modal>
        </>
      )}
    </>
  );
}