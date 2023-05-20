
import FetchSelect from "../../shared/components/FetchSelect"
import TableHead from "../../shared/components/TableHead"
import DataRow from "./components/DataRow"
import InputsRow from "./components/InputsRow"
import { creationHeaders } from "../../utils/helpers"

import "./details.css"
import useDetails from "./useDetails"

const Details = () => {
    
    const {hasChanges,  editRow, actionType, rows, head, handleHead, handleCancel ,handleAdd, handleInput, handleDelete} = useDetails();

    return (
        <div>

            <div className="details_actions">
                
                <button className="action_button" onClick={handleCancel}>Cancel</button>
                <button className="action_button">{actionType == "edit" ? "Update" : "Create"}</button>
            </div>

            {
                (hasChanges()) && <>Changes pending to be saved...</>
            }

            <div>
                <label htmlFor="project">Project Name </label>
                <FetchSelect state={head.project} id="project" onInput={handleHead} />
            </div>

            <div>
                <label htmlFor="project">Task Name </label>
                <input type="text" id="task" value={head.task} onInput={handleHead} />
            </div>

            <div className="table_container">
                <table>
                    <TableHead headers={creationHeaders} />
                    <tbody>
                        <InputsRow state={editRow} handleAdd={handleAdd} handleInput={handleInput} />

                        {
                            rows.map((row, i) => <DataRow index={i} key={i} data={row} handleDelete={handleDelete} />)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Details