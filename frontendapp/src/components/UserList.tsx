import { Component, ChangeEvent } from "react";
import UserService from "../services/users";
import { Link } from "react-router-dom";
import { User } from '../interfaces/user';


type Props = {};

type State = {
  users: Array<User>,
  currentUser: User | null,
  currentIndex: number,
  searchTitle: string
};

export default class UserList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);


    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    UserService.getAll()
      .then((response: any) => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
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
    const { searchTitle, users, currentUser, currentIndex } = this.state;
    return (
    <div className="list row">
      <div className="col-md-6">
        <h4>User List</h4>

        <ul className="list-group">
          {users &&
            users.map((user: User, index: number) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveUser(user, index)}
                key={index}
              >
                {user.name}
              </li>
            ))}
        </ul>


      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentUser.name}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentUser.email}
            </div>
            <div>
              <label>
                <strong>Age:</strong>
              </label>{" "}
              {currentUser.age }
            </div>

            <Link
              to={"/users/" + currentUser.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
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
