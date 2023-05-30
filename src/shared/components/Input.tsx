import { FormEventHandler } from "react";

interface Props {
  id: string;
  inputType: string;
  state: string | boolean;
  handler: FormEventHandler;
  placeholder?: string;
}

const Input = ({ id, inputType = "text", state, handler, placeholder="some text" }: Props) => {
    const inputClassName = inputType === "checkbox" ? "form-check-input mb-3" : "form-control mb-3";
  
    return (
      <input
        className={inputClassName}
        id={id}
        placeholder={placeholder}
        type={inputType}
        value={typeof state === "string" ? state : ""}
        checked={typeof state === "boolean" ? state : false}
        onChange={handler}
      />
    );
  };
  

export default Input;
