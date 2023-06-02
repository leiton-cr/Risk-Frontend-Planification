import FetchSelect from "../../shared/components/FetchSelect";
import TableHead from "../../shared/components/TableHead";
import InputsRow from "./components/InputsRow";
import { creationHeaders } from "../../utils/helpers";
import "./details.css";
import useDetails from "./useDetails";
import { Link, useNavigate } from "react-router-dom";

const Details = () => {
  const {
    hasChanges,
    actionType,
    rows,
    head,
    handleHead,
    handleCancel,
    handleAdd,
    handleInput,
    handleDelete,
    handleCreate
  } = useDetails();

  const navigate = useNavigate();

  return (
    <div className="container-fluid col-md-10">
      <div className="d-flex py-3 flex-column">
        <div className="d-flex justify-content-between">
          <button onClick={() => navigate("/")} className="btn btn-dark">
            <i className="bi bi-arrow-left"></i> Back
          </button>

          <div>
            <button className="btn btn-danger" onClick={handleCancel}>
              Cancel <i className="bi bi-x-lg"></i>
            </button>

            <button className="btn btn-primary ms-2" onClick={handleCreate}>
              {actionType === "edit" ? "Update" : "Create"}{" "}
              <i className="bi bi-arrow-up-circle"></i>
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          {hasChanges && (
            <span className="blink-text">Changes pending to be saved...</span>
          )}
        </div>
      </div>

      <div className="">
        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="project" className="form-label">
              Project Name
            </label>
            <FetchSelect
              state={head.project}
              id="project"
              onInput={handleHead}
            />
          </div>

          <div className="mb-3 col-md-6">
            <label htmlFor="task" className="form-label">
              Task Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Create risk crud..."
              id="taskDescription"
              value={head.taskDescription}
              onInput={handleHead}
            />
          </div>
        </div>
        <hr></hr>

        <button
          className="btn btn-primary"
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
          New Risk <i className=" fa-1x bi bi-plus-circle"></i>
        </button>
      </div>

      <div className="table-container ">
        <table className="table  table-responsive ">
          <TableHead headers={creationHeaders} />
          <tbody className="table table-hover ">
            {rows.map((row, i) => (
              <InputsRow
                state={row}
                handleInput={handleInput}
                handleDelete={handleDelete}
                index={i}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
