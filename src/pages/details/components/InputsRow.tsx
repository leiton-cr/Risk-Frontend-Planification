/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { FormEventHandler } from "react";
import FetchSelect from "../../../shared/components/FetchSelect";
import "../details.css";

interface Props {
  handleDelete: any;
  handleInput: FormEventHandler;
  state: any;
  index: Number;
}

const InputsRow = ({ state, handleInput, handleDelete, index }: Props) => {
  return (
    <tr data-key={index}>
      <td>
        <input
          style={{ width: "200px" }}
          id="riskDescription"
          className="form-control"
          value={state.riskDescription.val}
          onInput={handleInput}
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
          size={"200px"}
          isColorized={true}
        />
      </td>
      <td>
        <FetchSelect
          state={state.impact.id}
          id="impact"
          onInput={handleInput}
          size={"200px"}
          isColorized={true}
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
          size={"200px"}
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
      <td className="sticky-delete  bg-light">
        <button
          onClick={() => handleDelete(index, state.id)}
          style={{
            backgroundColor: "#e13647",
            border: "none",
            borderRadius: "5px",
            color: "white",
          }}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  );
};

export default InputsRow;
