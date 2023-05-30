/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { RowData } from "../../models/RowData";
import { emptyRowData } from "../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import useAlerts from "../../hooks/useAlerts";
import useFetch from "../../hooks/useFetch";
import useRegister from "../../hooks/useRegister";

const useDetails = () => {
  const [actionType, setActionType] = useState("create");
  const [head, setHead] = useState({ project: "-1", task: "" });
  const [rows, setRows] = useState(Array<RowData>);
  const [editRow, setEditRow] = useState(
    JSON.parse(JSON.stringify(emptyRowData))
  );
  const { postData } = useFetch();
  const navigate = useNavigate();
  const { promiseAlert, toastAlert } = useAlerts();
  const { createRegister } = useRegister();
  const { id } = useParams();

  useEffect(() => {
    alert(id);
  }, []);

  const handleAdd = () => {
    setRows([...rows, editRow]);
    setEditRow(JSON.parse(JSON.stringify(emptyRowData)));
  };

  const handleDelete = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleInput = (e: FormEvent) => {
    if (e.nativeEvent.target) {
      const index = (e.nativeEvent.target as any).selectedIndex;
      if (index) {
        const value = (e.nativeEvent.target as any)[index].text;
        return setEditRow({
          ...editRow,
          [e.currentTarget.id]: {
            id: (e.target as HTMLInputElement).value,
            val: value,
          },
        });
      }
    }

    setEditRow({
      ...editRow,
      [e.currentTarget.id]: {
        id: "",
        val: (e.target as HTMLInputElement).value,
      },
    });
  };

  const handlePoints = () => {
    setEditRow({
      ...editRow,
      points: { id: "", val: editRow.probability.id * editRow.impact.id },
    });
  };

  const handleHead = (e: FormEvent) => {
    setHead({
      ...head,
      [e.currentTarget.id]: (e.target as HTMLInputElement).value,
    });
  };

  const handleCreate = async () => {
    try {
      const register = createRegister(head, rows);
      await postData("https://localhost:7071/Register", register);
      toastAlert("Risk added successfully!", "success");
    } catch (error) {
      console.error("An error occurred:", error);
      toastAlert("Error occurred while adding the risk.", "error");
    }
  };

  const handleCancel = () => {
    if (actionType === "edit") {
      if (!hasEditChanges()) {
        navigate(-1);
        return;
      }

      promiseAlert("Are you sure?", "Unsaved changes will be lost.").then(
        ({ isConfirmed }) => {
          if (isConfirmed) {
            navigate("/");
          }
        }
      );
    } else {
      if (!hasCreateChanges()) {
        navigate(-1);
        return;
      }

      promiseAlert("Are you sure?", "Unsaved changes will be lost.").then(
        ({ isConfirmed }) => {
          if (isConfirmed) {
            navigate("/");
          }
        }
      );
    }
  };

  const hasChanges = () => {
    return actionType == "edit" ? hasEditChanges() : hasCreateChanges();
  };

  const hasCreateChanges = () => {
    return !(rows.length == 0 && head.project === "-1" && head.task === "");
  };

  const hasEditChanges = () => {
    return !(rows.length == 0 && head.project === "-1" && head.task === "");
  };

  useEffect(() => {
    if (id) {
      setActionType("edit");
    }
  }, []);

  useEffect(() => {
    handlePoints();
  }, [editRow.probability, editRow.impact]);

  return {
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
    handlePoints,
  };
};

export default useDetails;
