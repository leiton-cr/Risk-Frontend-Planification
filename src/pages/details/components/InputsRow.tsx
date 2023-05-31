// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/ban-types */

// import { FormEventHandler, MouseEventHandler } from "react"
// import FetchSelect from "../../../shared/components/FetchSelect"

// interface Props{
//     handleAdd: MouseEventHandler<HTMLButtonElement>,
//     handleInput: FormEventHandler,
//     handlePoints:FormEventHandler,
//     state: any
// }

// const InputsRow = ({state, handleAdd, handleInput, handlePoints}: Props) => {

//     return (
//         <tr>
//             <td>
//                 <input id="riskDescription"  value={state.riskDescription.val} onInput={handleInput}></input>
//             </td>
//             <td>
//                 <input id="impactDescription" value={state.impactDescription.val} onInput={handleInput}></input>
//             </td>
//             <td>
//                <FetchSelect state={state.probability.id} id="probability" onInput={handleInput}/>
//             </td>
//             <td>
//                 <FetchSelect state={state.impact.id} id="impact" onInput={handleInput}/>
//             </td>
//             <td>
//                 <input id="owner" value={state.owner.val} onInput={handleInput}></input>
//             </td>
//             <td>
//                 <input id="responsePlan" value={state.responsePlan.val} onInput={handleInput}></input>
//             </td>
//             <td>
//                 <FetchSelect state={state.priority.id} id="priority" onInput={handleInput}/>
//             </td>
//             <td>
//                 <input readOnly={true} value={state.points.val} onInput={handlePoints}></input>
//             </td>
//             <td>
//                 <button onClick={handleAdd}>Add</button>
//             </td>
//         </tr>
//     )
// }

// export default InputsRow

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { FormEventHandler, MouseEventHandler } from "react";
import FetchSelect from "../../../shared/components/FetchSelect";
import "../details.css";

interface Props {
  handleAdd: MouseEventHandler<HTMLButtonElement>;
  handleInput: FormEventHandler;
  state: any;
  index: Number;
}

const InputsRow = ({ state, handleAdd, handleInput, index }: Props) => {
  return (
    <tr data-key={index}>
      <td>
        <input
          style={{ width: "200px" }}
          id="riskDescription"
          className="form-control"
          value={state.riskDescription.val }
          onInput={handleInput }
          placeholder="Describe the risk..."
        />
      </td>
      <td>
        <input
          style={{ width: "200px" }}
          id="impactDescription"
          className="form-control"
          value={state.impactDescription.val}
          onInput={handleInput}
          placeholder="Describe the impact..."
        />
      </td>
      <td>
        <FetchSelect
          state={state.probability.id}
          id="probability"
          onInput={handleInput}
          size={"160px"}
        />
      </td>
      <td>
        <FetchSelect
          state={state.impact.id}
          id="impact"
          onInput={handleInput}
          size={"150px"}
        />
      </td>
      <td>
        <input
          style={{ width: "200px" }}
          id="owner"
          className="form-control"
          value={state.owner.val}
          onInput={handleInput}
          placeholder="John Doe..."
        />
      </td>
      <td>
        <input
          style={{ width: "200px" }}
          id="responsePlan"
          className="form-control"
          value={state.responsePlan.val}
          onInput={handleInput}
          placeholder="Describe response action..."
        />
      </td>
      <td>
        <FetchSelect
          state={state.priority.val}
          id="priority"
          onInput={handleInput}
          size={"150px"}
        />
      </td>
      <td>
        <input
          style={{ width: "50px" }}
          readOnly={true}
          className="form-control"
          value={state.points.val}
        />
      </td>
      {/* <td>
        <button
          
          style={{
            backgroundColor: "#0c6efd",
            border: "none",
            borderRadius: "5px",
            color: "white",
            position: "sticky",
            right: "0",
          }}
          onClick={handleAdd}
        >
          Add
        </button>
      </td> */}
    </tr>
  );
};

export default InputsRow;
