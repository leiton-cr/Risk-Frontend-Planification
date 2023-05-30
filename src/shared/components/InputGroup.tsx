import { FormEventHandler } from "react";

import Input from "./Input";

interface Props {
  id: string;
  inputType: string;
  state: string | boolean;
  handler: FormEventHandler;
  placeholder?: string
}

const InputGroup = ({ id, inputType, state, handler, placeholder= "some text" }: Props) => {
  return (
    <div className="">
      <label htmlFor={id}>{id.replace("_", " ")}</label>
      <Input
        id={id}
        inputType={inputType}
        state={state}
        handler={handler}
        placeholder={placeholder}
      ></Input>
    </div>
  );
};

export default InputGroup;
