import { FormEventHandler } from "react";

import Input from "./Input"

interface Props {
    id: string;
    inputType: string;
    state: string | boolean;
    handler: FormEventHandler;
}

const InputGroup = ({ id, inputType, state, handler }: Props) => {

    return (
        <div className="input_group">
            <label className="input_label" htmlFor={id}>{id.replace("_", " ")}</label>
            <Input id={id} inputType={inputType} state={state} handler={handler} ></Input>
        </div>
    )
}

export default InputGroup