import { FormEventHandler } from "react";

interface Props {
    id:string
    inputType: string;
    state: string | boolean;
    handler: FormEventHandler;
}

const Input = ({ id, inputType = "text", state, handler }: Props) => {
    return (
        <input 
            id={id} 
            type={inputType}  
            value={typeof(state) == "string" ? state : ""} 
            checked = {typeof(state) == "boolean" ? state : false} 
            onChange={handler}
        ></input>
    )
}

export default Input