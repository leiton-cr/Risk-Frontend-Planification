/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react"
import FetchSelect from "../../shared/components/FetchSelect"
import TableHead from "../../shared/components/TableHead"
import DataRow from "./components/DataRow"
import InputsRow from "./components/InputsRow"
import { RowData } from "../../models/RowData"
import { creationHeaders, emptyRowData } from "../../utils/helpers"
import { useNavigate, useParams } from "react-router-dom"
import useAlerts from "../../hooks/useAlerts"

import "./details.css"

const Details = () => {
    
    const [actionType, setActionType] = useState("create")

    const [head, setHead] = useState({ project: "-1", task: "" })
    const [rows, setRows] = useState(Array<RowData>)
    const [editRow, setEditRow] = useState(JSON.parse(JSON.stringify(emptyRowData)))

    const navigate = useNavigate();

    const { promiseAlert } = useAlerts()

    const { id } = useParams();

    const handleAdd = () => {
        setRows([...rows, editRow])
        setEditRow(JSON.parse(JSON.stringify(emptyRowData)));
    }

    const handleDelete = (index: number) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    }

    const handleInput = (e: FormEvent) => {
        if (e.nativeEvent.target) {
            const index = (e.nativeEvent.target as any).selectedIndex;
            if (index) {
                const value = (e.nativeEvent.target as any)[index].text;
                return setEditRow({ ...editRow, [e.currentTarget.id]: { id: (e.target as HTMLInputElement).value, val: value } });
            }
        }

        setEditRow({ ...editRow, [e.currentTarget.id]: { id: "", val: (e.target as HTMLInputElement).value } });
    }

    const handleHead = (e: FormEvent) => {
        setHead({ ...head, [e.currentTarget.id]: (e.target as HTMLInputElement).value });
    }

    const handleCancel = () => {
        if (actionType === "edit") {
            if (!hasEditChanges()) {
                navigate(-1);
                return
            }

            promiseAlert("Are you sure?", "Unsaved changes will be lost.")
                .then(({ isConfirmed }) => {
                    if (isConfirmed) {
                        navigate("/")
                    }
                })

        } else {
            if (!hasCreateChanges()) {
                navigate(-1);
                return
            }

            promiseAlert("Are you sure?", "Unsaved changes will be lost.")
                .then(({ isConfirmed }) => {
                    if (isConfirmed) {
                        navigate("/")
                    }
                })
        }
    }

    const hasCreateChanges = () => {
        return !(rows.length == 0 && head.project === "-1" && head.task === "");
    }

    const hasEditChanges = () => {
        return !(rows.length == 0 && head.project === "-1" && head.task === "");
    }

    useEffect(() => {
        if(id){
            setActionType("edit")
        }
    }, [])
    

    return (
        <div>

            <div className="details_actions">
                
                <button className="action_button" onClick={handleCancel}>Cancel</button>
                <button className="action_button">{actionType == "edit" ? "Update" : "Create"}</button>
            </div>

            {
                (actionType === "create" ? hasCreateChanges() : hasEditChanges()) && <>Changes pending to be saved...</>
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