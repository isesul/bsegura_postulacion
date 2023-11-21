import { Component } from "react"
import { User } from "../interfaces/user"

type Props = {
  currentUser?: User | null
  state?: any
};
type State = {
  currentUser: User | null
  currentpage: number
  newUser?: User
};

export default class UserForm extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.changeEvent = this.changeEvent.bind(this);

    this.state = {
      currentUser: null,
      currentpage: 1
    };
  }

  componentDidMount() {
    console.log(`componentDidMount:`, this)
  }
  componentDidUpdate() {    
    console.log(`componentDidUpdate:`, this)
  }

  changeEvent(event: React.ChangeEvent<HTMLInputElement>) {
    if(this.props.currentUser != null){
      try {
        this.props.currentUser[event.target.name] = event.target.value;
        this.setState({
          currentUser: this.props.currentUser
        })
      } catch (error) {
        console.error(error);
      }
    }
  }

  saveEvent() {

  }

  render() {

    return (
      <div>
        <form>
          <div className="input-group mb-3">
            <span className="input-group-text" id="input-name">👤</span>
            <input 
              onChange={ (event) => this.changeEvent(event)}
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
              value={this.props.currentUser?.age}
              type="text" 
              className="form-control" 
              name='age'  
              placeholder="Age" 
              aria-label="Age" 
              aria-describedby="addon-wrapping" />
          </div>

          <div className="input-group mb-3 justify-content-md-end">
            <button type="button" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    )
  }
}
