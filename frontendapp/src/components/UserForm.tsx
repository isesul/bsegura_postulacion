import { useReducer, useState } from "react"
import { User } from "../interfaces/user"

interface FormState {
    inputValues: User
}

const INITIAL_STATE = {
    name: '',
    email: '',
    age: 0,
}

type FormReducerAction = {
    type: "change_value",
    payload: {
        inputName: string,
        inputValue: string
    }
} | {type: "clear"}

const formReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
    if(action.type === "change_value"){
        const {inputName, inputValue} = action.payload
        return {
            ... state,
            [inputName]: inputValue
        }
    }
    else if(action.type === "clear"){
        return INITIAL_STATE
    }
}

const UserForm = () => {

    const [inputVal, setInputVal] = useState<User>(INITIAL_STATE)

    const handler = () => {}

    const changeEvent = (evnt: React.ChangeEvent<HTMLInputElement>) => {
        
    }

    return (
        <div>
            <form>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="input-name">👤</span>
                    <input onChange={changeEvent} type="text" className="form-control" name='name' placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="input-email">✉</span>
                    <input onChange={changeEvent} type="text" className="form-control" name='email' placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="input-age"> № </span>
                    <input onChange={changeEvent} type="text" className="form-control" name='age'  placeholder="Age" aria-label="Age" aria-describedby="addon-wrapping" />
                </div>
                <div className="input-group mb-3 justify-content-md-end">

                    <button type="button" className="btn btn-primary">Save</button>
                </div>

            </form>
        </div>
    )
}

export default UserForm