import { useContext, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { CurrentUserContext } from "../contexts/UsersContextProvider";

export default function Dashboard() {
  
  const currentUser = useContext(CurrentUserContext);

  useEffect(()=>{

  }, [currentUser])

  return (

    <div className="list row">
      <UserList></UserList>

      <div className="col-md-6">
        <h4>User Detail</h4>
        <br />
        <br />
        {currentUser.currentUser ? (
          <UserForm></UserForm>
        ) : (
          <div>
            <br />
            <p>Please select a user...</p>
          </div>
        )}
      </div>

    </div>
  )
}

