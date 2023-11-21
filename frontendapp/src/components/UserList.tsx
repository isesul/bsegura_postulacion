import { Component, ChangeEvent } from "react";
import UserService from "../services/users";
import { Link } from "react-router-dom";
import { User } from '../interfaces/user';
import UserForm from "./UserForm";

type Props = {};

type State = {
  users: Array<User>,
  currentUser: User | null,
  currentIndex: number,
  searchTitle: string,
  totalpages: number,
  currentpage: number,
};

export default class UserList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchTitle: "",
      totalpages: 0,
      currentpage: 1
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    UserService.getAll()
      .then((response: any) => {
        this.setState({
          users: response.data,
          totalpages: response.headers.totalpages
        });
        console.log(response.data);
        console.info(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  selectPage(page: number){
    UserService.getPage(page)
    .then((response: any) => {
      this.setState({
        users: response.data,
        totalpages: response.headers.totalpages,
        currentpage: page
      });
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  nextPage(){
    if( (this.state.currentpage+1)<=this.state.totalpages ){
      this.selectPage((this.state.currentpage+1));
    }
  }

  previousPage(){
    if( (this.state.currentpage-1) > 0 ){
      this.selectPage((this.state.currentpage-1));
    }
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user: User, index: number) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  render() {
    const { searchTitle, users, currentUser, currentIndex, totalpages } = this.state;
    let pages = [];
    
    for(let i = 1; i <= totalpages; i++){
      pages.push(i);
    }
    return (
    <div className="list row">
      <div className="col-md-6">
        <h4>User List</h4>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
            </tr>
          </thead>

          <tbody>

          {users &&
            users.map((user: User, index: number) => (
              <tr onClick={() => this.setActiveUser(user, index)} key={index} >
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
              </tr>
          ))}
          </tbody>
        </table>

        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className="page-item"><a onClick={() => this.previousPage()} className="page-link" href="#">Previous</a></li>

            {
              pages.map((page:number) => (
                
                <li className={page == this.state.currentpage ? "active" : "inactive"}><a onClick={() => this.selectPage(page)} className="page-link" >{page}</a></li>
              ))
            }
          <li className="page-item"><a onClick={() => this.nextPage()} className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>

      <div className="col-md-6">
        <h4>User Detail</h4>
        <br />
        <br />
        {currentUser ? (
          <UserForm currentUser={this.state.currentUser} state={this.state}></UserForm>
        ) : (
          <div>
            <br />
            <p>Please click on a user...</p>
          </div>
        )}
      </div>
    </div>
    )
  }
}
