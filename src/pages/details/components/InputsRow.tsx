/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */


import { FormEventHandler, MouseEventHandler } from "react"
import FetchSelect from "../../../shared/components/FetchSelect"

interface Props{
    handleAdd: MouseEventHandler<HTMLButtonElement>,
    handleInput: FormEventHandler,
    state: any
}

const InputsRow = ({state, handleAdd, handleInput}: Props) => {
    
    return (
        <tr>
            <td>
                <input id="riskDescription"  value={state.riskDescription.val} onInput={handleInput}></input>
            </td>
            <td>
                <input id="impactDescription" value={state.impactDescription.val} onInput={handleInput}></input>
            </td>
            <td>
               <FetchSelect state={state.probability.id} id="probability" onInput={handleInput}/>
            </td>
            <td>
                <FetchSelect state={state.impact.id} id="impact" onInput={handleInput}/>
            </td>
            <td>
                <input id="owner" value={state.owner.val} onInput={handleInput}></input>
            </td>
            <td>
                <input id="responsePlan" value={state.responsePlan.val} onInput={handleInput}></input>
            </td>
            <td>
                <FetchSelect state={state.priority.id} id="priority" onInput={handleInput}/>
            </td>
            <td>
                <input readOnly={true} value={state.points.val}></input>
            </td>
            <td>
                <button onClick={handleAdd}>Add</button>
            </td>
        </tr>
    )
}

export default InputsRow