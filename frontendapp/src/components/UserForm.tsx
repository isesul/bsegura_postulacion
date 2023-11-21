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
                <input onChange={changeEvent} type='text' name='name' placeholder="Name" />
                <input onChange={changeEvent} type='text' name='email' placeholder="Email" />
                <input onChange={changeEvent} type='number' name='age' placeholder="Age" />
            </form>
        </div>
    )
}

export default UserForm