// import FetchSelect from "../../shared/components/FetchSelect"
// import TableHead from "../../shared/components/TableHead"
// import DataRow from "./components/DataRow"
// import InputsRow from "./components/InputsRow"
// import { creationHeaders } from "../../utils/helpers"

// import "./details.css"
// import useDetails from "./useDetails"

// const Details = () => {

//     const { hasChanges, editRow, actionType, rows, head, handleHead, handleCancel, handleAdd, handleInput, handleDelete, handleCreate, handlePoints } = useDetails();

//     return (
//         <div>

//             <div className="d-flex p-3 justify-content-center">
//                 <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
//                 <button className="btn btn-primary" onClick={handleCreate}>{actionType == "edit" ? "Update" : "Create"}</button>
//             </div>

//             {
//                 (hasChanges()) && <>Changes pending to be saved...</>
//             }

//             <div className="">
//                 <div>
//                     <label htmlFor="project">Project Name </label>
//                     <FetchSelect state={head.project} id="project" onInput={handleHead} />
//                 </div>

//                 <div>
//                     <label htmlFor="project">Task Name </label>
//                     <input type="text" id="task" value={head.task} onInput={handleHead} />
//                 </div>
//             </div>

//             <div className="">
//                 <table>
//                     <TableHead headers={creationHeaders} />
//                     <tbody>
//                         <InputsRow state={editRow} handleAdd={handleAdd} handleInput={handleInput} handlePoints={handlePoints} />

//                         {
//                             rows.map((row, i) => <DataRow index={i} key={i} data={row} handleDelete={handleDelete} />)
//                         }

//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     )
// }

// export default Details

import FetchSelect from "../../shared/components/FetchSelect";
import TableHead from "../../shared/components/TableHead";
import DataRow from "./components/DataRow";
import InputsRow from "./components/InputsRow";
import { creationHeaders } from "../../utils/helpers";
import "./details.css";
import useDetails from "./useDetails";
import { Link } from "react-router-dom";

const Details = () => {
  const {
    hasChanges,
    editRow,
    actionType,
    rows,
    head,
    handleHead,
    handleCancel,
    handleAdd,
    handleInput,
    handleDelete,
    handleCreate,
  } = useDetails();

  return (
    <div className="container-fluid col-md-10">
      <div className="d-flex py-3 flex-column">
        <div className="d-flex justify-content-between">
          <Link to="/">
            <button className="btn btn-dark">
              <i className="bi bi-arrow-left"></i> Back
            </button>
          </Link>

          <div>
            <button className="btn btn-danger" onClick={handleCancel}>
              Cancel <i className="bi bi-x-lg"></i>
            </button>

            <button className="btn btn-primary ms-2" onClick={handleCreate}>
              {actionType === "edit" ? "Update" : "Create"}{" "}
              <i className="bi bi-plus-lg"></i>
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
          Add
        </button>
      </div>

      <div className="table-container">
        <table className="table  table-responsive">
          <TableHead headers={creationHeaders} />
          <tbody className="table table-hover">
            {/* <InputsRow
              state={editRow}
              handleAdd={handleAdd}
              handleInput={handleInput}
              handlePoints={handlePoints}
              index={0}
              
            /> */}

            {rows.map((row, i) => (
              // <DataRow
              //   index={i}
              //   key={i}
              //   data={row}
              //   handleDelete={handleDelete}
              // />
              <InputsRow
                state={row}
                handleAdd={handleAdd}
                handleInput={handleInput}
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
