import { createContext, useContext, useEffect, useState } from "react";
import { User, IUserList } from '../interfaces/user';
import UserForm from "./UserForm";
import UserService from "../services/users";
import { UsersContext, CurrentUserContext, useUsers, useCurrentUser } from "../contexts/UsersContextProvider";

/**
  * UserList Functional Component
  * @description: 
  * This component renders a users list obtained from backend.
  */
export default function UserList() {

  // Global App state for Current User (Context React Api)
  const stateUsers = useUsers();
  const stateCurrentUsers = useCurrentUser();
  
  // Local Component state
  const [totalPages, setTotalPages] = useState(10);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentpage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(-1);

  async function retrieveUsers() {

    const retrievedUsers = await UserService.getAll();

    stateUsers.saveUsers(retrievedUsers.data);
    setTotalPages(retrievedUsers.headers.totalpages);
    setPagesList(retrievedUsers.headers.totalpages);
    
    return retrievedUsers;
  }

  function setPagesList(total_pages: number){
    const list_pages: number[] = [];
    for(let i = 1; i <= total_pages; i++){
      list_pages.push(i);
    }
    setPages(list_pages);
    return list_pages;
  }

  async function previousPage() {
    if( (currentPage-1) > 0 ){
      await selectPage((currentPage-1));
    }
  }

  async function nextPage() {
    if( (currentPage+1)<=totalPages ){
      await selectPage((currentPage+1));
    }
  }

  async function selectPage(selected_page: number) {
    const retrievedUsers = await UserService.getPage(selected_page);
    stateUsers.saveUsers(retrievedUsers.data);
    setCurrentpage(selected_page);
    stateCurrentUsers.saveCurrentUser(null);
    setCurrentIndex(-1);
  }

  async function setActiveUser(user: any, index: any) {
    stateCurrentUsers.saveCurrentUser(user);
    // const idx = users.findIndex((iteruser) => iteruser.id === user.id);
    setCurrentIndex(index);
  }

  async function loadComponent(){
    if(stateUsers.users === null || stateUsers.users === undefined){
      await retrieveUsers();
    } else {
      if(stateUsers.users.length <= 0 ){
        console.warn('userlist empty: ');
      }
    }
  }

  useEffect(()=>{
    loadComponent();
     
  },[stateUsers, stateCurrentUsers])

  return (

      <div className="col-md-6">
        <h4>User List</h4>

        <table className="table  table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
            </tr>
          </thead>

          <tbody>
          {stateUsers.users &&
            stateUsers.users.map((user: User, index: number) => (
              <tr 
                style={{cursor: "pointer"}}
                className={currentIndex===index?'table-active':''} 
                onClick={() => setActiveUser(user, index)} 
                key={index} >

                  <th key={user.id} scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>

              </tr>
          ))}
          </tbody>
        </table>

        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li key='page-previous' className="page-item"><a onClick={() => previousPage()} className="page-link" href="#">Previous</a></li>
            {
              pages.map((page:number) => (
                <li 
                  key={`page-${page}`}
                  className={page == currentPage ? "active" : "inactive"}
                >
                  <a onClick={() => selectPage(page)} className="page-link" style={{cursor: "pointer"}}>{page}</a>
                </li>
              ))
            }
          <li key='page-next' className="page-item"><a onClick={() => nextPage()} className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
  )
}