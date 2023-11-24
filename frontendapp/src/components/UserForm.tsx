import { useEffect, useState } from "react"
import { useCurrentUser, useUsers } from "../contexts/UsersContextProvider";
import { User } from "../interfaces/user";
import UserService from "../services/users";
import { useAuth } from "../contexts/LoginContextProvider";

export default function UserForm() {
    const stateCurrentUsers = useCurrentUser();
    const stateUsers = useUsers();
    const stateAuth = useAuth();

    const isAuthenticated = stateAuth.isAuthenticated;
    const currentUser: User = (stateCurrentUsers.currentUser) ? 
        stateCurrentUsers.currentUser : {} as User ;

    const [name, setName] = useState<any>();
    const [email, setEmail] = useState<any>();
    const [age, setAge] = useState<any>(0);
    
    function changeEvent(event: any){
        
        switch (event.target.name) {
            case "name":
                setName(event.target.value);
                break;
            case "email":
                setEmail(event.target.value);
                break;
            case "age":
                setAge(event.target.value);
                break;
            default:
                console.error("UNKNOW input name: changeEvent.event.target.name", event.target.name);
                throw Error("UNKNOW input name: changeEvent.event.target.name", event.target.name);
        }

        if(currentUser != null){
            try {
              currentUser[event.target.name] = event.target.value;
              stateCurrentUsers.saveCurrentUser(currentUser);
            } catch (error) {
              console.error('error', error);
            }
          }
          else{
            let tempcurrentUser = stateCurrentUsers.currentUser as unknown as User;
            try {
              if(tempcurrentUser!=null){
                tempcurrentUser[event.target.name] = event.target.value;
              }
              stateCurrentUsers.saveCurrentUser(tempcurrentUser);
            } catch(error){
              console.error('error', error);
            }
          }
    }

    async function updateEvent(){          
        if(currentUser?.id != null && currentUser?.id != undefined){
          const id = currentUser?.id;
          try {
            await UserService.update(currentUser, id);
            // TODO: show feedback ok
          } catch (error) {
            console.error('ERROR: UserService.update.error:', error);
            // TODO: show error
          }
          stateUsers.updateOneUser(currentUser);
        }
        
        try {
            stateUsers.updateOneUser(currentUser as User);
        } catch (error) {
          console.error('ERROR: stateUsers.updateOneUser.error:', error);
        }
    }

    function deleteEvent(){

    }

    function saveEvent(){

    }


    useEffect(()=>{
        //console.log('UserForm.useEffect.stateCurrentUsers: ', stateCurrentUsers);
        
        if(stateCurrentUsers.currentUser != undefined && stateCurrentUsers.currentUser != null ){
            const user = stateCurrentUsers.currentUser as User;
            setName(user.name);
            setEmail(user.email);
            setAge(user.age);
        }
        
    }, [stateCurrentUsers])

    return (
        <div>
        <form>
          <div className="input-group mb-3">
            <span className="input-group-text" id="input-name">👤</span>
            <input 
              onChange={ (event) => changeEvent(event)}
              key={`name-${currentUser?.id}`}
              value={name}
              type="text" 
              className="form-control" 
              name='name' 
              placeholder="Name" 
              aria-label="Name" 
              aria-describedby="addon-wrapping" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="input-email">✉</span>
            <input 
              onChange={ (event) => changeEvent(event)}
              key={`email-${currentUser?.id}`}
              value={email}
              type="text" 
              className="form-control" 
              name='email' 
              placeholder="Email" 
              aria-label="Email" 
              aria-describedby="addon-wrapping" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="input-age"> № </span>
            <input 
              onChange={ (event) => changeEvent(event)}
              key={`age-${currentUser?.id}`}
              value={age}
              type="text" 
              className="form-control" 
              name='age'  
              placeholder="Age" 
              aria-label="Age" 
              aria-describedby="addon-wrapping" />
          </div>

          { isAuthenticated ? (
            <>
            { currentUser ? (
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button onClick={()=>updateEvent()} type="button" className="btn btn-warning">Update</button>
                <button onClick={()=>deleteEvent()} type="button" className="btn btn-danger">Delete</button>
              </div>
            ):(
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button onClick={saveEvent} type="button" className="btn btn-primary">Save</button>
              </div>
            )}
            </>
          ): (
            <> 
            {/** do nothing */}
            </>
          )}

        </form>
      </div>
    )
}
