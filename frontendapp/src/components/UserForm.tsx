import { Component } from "react"
import { User } from "../interfaces/user"
import UserService from "../services/users";

type Props = {
  currentUser?: User | null
  state?: any
};
type State = {
  currentUser: User
  currentpage: number
  newUser?: User
  redirect?: boolean
};

const EMPTY_USER = {
  name: "",
  email: "",
  age: 0
} as User

export default class UserForm extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.changeEvent = this.changeEvent.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.state = {
      currentUser: EMPTY_USER,
      currentpage: 1,
      redirect: false
    };
  }

  componentDidMount() {
    console.info('UserForm.componentDidMount')
  }
  componentDidUpdate() {    
    console.info('UserForm.componentDidUpdate')
  }


  changeEvent(event: React.ChangeEvent<HTMLInputElement>) {
    console.info('UserForm.changeEvent')
    if(this.props.currentUser != null){
      try {
        this.props.currentUser[event.target.name] = event.target.value;
        this.setState({
          currentUser: this.props.currentUser
        });
      } catch (error) {
        console.error('error', error);
      }
    }
    else{
      let currentUser = this.state.currentUser
      try {
        if(currentUser!=null){
          currentUser[event.target.name] = event.target.value;
        }
        this.setState({currentUser});
      } catch(error){
        console.error('error', error);
      }
    }
  }

  async saveEvent(event?: any) {
    console.info('UserForm.saveEvent')
    let status = await UserService.create(this.state.currentUser);
  }


  async updateEvent(){
    console.info('UserForm.updateEvent')
    const data = this.props.currentUser as User;
    let status: any = "";

    if(this.props.currentUser?.id != null && this.props.currentUser?.id != undefined){
      const id = this.props.currentUser?.id;
      status = await UserService.update(data, id);
    }
    
    try {
      const userListState = this.props.state.state;
      let idx = userListState.users.findIndex(((obj:any) => obj.id == this.props.currentUser?.id))
      userListState.users[idx] = this.props.currentUser;
      this.props.state.setState({
        currentUser: null
      })
    } catch (error) {
      console.error(error)
    }
  }

  async deleteEvent(){
    console.info('UserForm.updateEvent')
    let status: any = "";
    if(this.props.currentUser?.id != null && this.props.currentUser?.id != undefined){
      const id = this.props.currentUser?.id;
      status = await UserService.delete(id);
    }

    try {
      let idx = this.props.state.state.users.findIndex(((obj:any) => obj.id == this.props.currentUser?.id))
      const userListState = this.props.state.state;
      userListState.users.splice(idx, 1);
      this.props.state.setState({
        currentUser: null
      })
      
    } catch (error) {
      console.error(error)
    }

  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  render() {

    return (
      <div>
        <form>
          <div className="input-group mb-3">
            <span className="input-group-text" id="input-name">👤</span>
            <input 
              onChange={ (event) => this.changeEvent(event)}
              key={`name-${this.props.currentUser?.id}`}
              value={this.props.currentUser?.name}
              type="text" 
              className="form-control" 
              name='name' 
              placeholder="Name" 
              aria-label="Name" 
              aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="input-email">✉</span>
            <input 
              onChange={ (event) => this.changeEvent(event)}
              key={`email-${this.props.currentUser?.id}`}
              value={this.props.currentUser?.email}
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
              onChange={ (event) => this.changeEvent(event)}
              key={`age-${this.props.currentUser?.id}`}
              value={this.props.currentUser?.age}
              type="text" 
              className="form-control" 
              name='age'  
              placeholder="Age" 
              aria-label="Age" 
              aria-describedby="addon-wrapping" />
          </div>

          {this.props.currentUser ? (
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button onClick={()=>this.updateEvent()} type="button" className="btn btn-warning">Update</button>
              <button onClick={()=>this.deleteEvent()} type="button" className="btn btn-danger">Delete</button>
            </div>
          ):(
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button onClick={this.saveEvent} type="button" className="btn btn-primary">Save</button>
            </div>
          )}
        </form>
      </div>
    )
  }
}
