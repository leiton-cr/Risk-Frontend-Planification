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
  const [head, setHead] = useState({
    project: "-1",
    taskDescription: "",
    taskId: "",
    id: "",
  });
  const [rows, setRows] = useState(Array<any>);
  const [hasChanges, setHasChanges] = useState(false);
  const [editRow, setEditRow] = useState(
    JSON.parse(JSON.stringify(emptyRowData))
  );
  const { postData, getData, putData } = useFetch();
  const navigate = useNavigate();
  const { promiseAlert, toastAlert } = useAlerts();
  const { createRegister, editRegister } = useRegister();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await getData(`https://localhost:7071/Register/${id}`);
        const { head, rows } = editRegister(response);
        setHead(head);
        setRows(rows);
      };

      fetchData();
    }
  }, [setRows]);

  useEffect(() => {
    if (id) {
      setActionType("edit");
    }
    setRows([emptyRowData]);
  }, []);

  useEffect(() => {}, [editRow.probability, editRow.impact]);

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
    setHasChanges(true);
    const rowIndex = Number(e.currentTarget.closest("tr")?.dataset.key);
    if (e.nativeEvent.target) {
      const index = (e.nativeEvent.target as any).selectedIndex;

      if (index) {
        const value = (e.nativeEvent.target as any)[index].text;
        rows[rowIndex][e.currentTarget.id] = {
          id: (e.target as HTMLInputElement).value,
          val: value,
        };

        if (
          e.currentTarget.id === "probability" ||
          e.currentTarget.id === "impact"
        ) {
          rows[rowIndex]["points"] = {
            id: (e.target as HTMLInputElement).value,
            val: rows[rowIndex]["probability"].id * rows[rowIndex]["impact"].id,
          };
          return setRows([...rows]);
        }
      }
    }

    rows[rowIndex][e.currentTarget.id] = {
      id: "",
      val: (e.target as HTMLInputElement).value,
    };
    setRows([...rows]);
  };

  const handleHead = (e: FormEvent) => {
    setHasChanges(true);
    setHead({
      ...head,
      [e.currentTarget.id]: (e.target as HTMLInputElement).value,
    });
  };

  // const handleCreate = async () => {
  //   if (id) {
  //     const updatedData = createRegister(head, rows);
  //     const response = await putData(
  //       `https://localhost:7071/Register/?id=${id}`,
  //       updatedData
  //     );
  //     if (response) {
  //       toastAlert("Risk added successfully!", "success");
  //     }
  //   } else {
  //     try {
  //       const register = createRegister(head, rows);
  //       const response = await postData(
  //         "https://localhost:7071/Register",
  //         register
  //       );
  //       if (response) {
  //         toastAlert("Risk added successfully!", "success");
  //       }
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //       toastAlert("Error occurred while adding the risk.", "error");
  //     }
  //   }
  //   setHasChanges(false);
  // };

  const handleCreate = async () => {
    try {
      const register = createRegister(head, rows);
      const url = id
        ? `https://localhost:7071/Register/?id=${id}`
        : "https://localhost:7071/Register";
      const response = await (id
        ? putData(url, register)
        : postData(url, register));

      if (response) {
        toastAlert("Risk added successfully!", "success");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toastAlert("Error occurred while adding the risk.", "error");
    } finally {
      setHasChanges(false);
    }
  };

  const handleCancel = () => {
    if (actionType === "edit") {
      // if (!hasEditChanges()) {
      //   navigate(-1);
      //   return;
      // }

      promiseAlert("Are you sure?", "Unsaved changes will be lost.").then(
        ({ isConfirmed }) => {
          if (isConfirmed) {
            navigate("/");
          }
        }
      );
    } else {
      // if (!hasCreateChanges()) {
      //   navigate(-1);
      //   return;
      // }

      promiseAlert("Are you sure?", "Unsaved changes will be lost.").then(
        ({ isConfirmed }) => {
          if (isConfirmed) {
            navigate("/");
          }
        }
      );
    }
  };

  // const hasChanges = () => {
  //   return actionType == "edit" ? hasEditChanges() : hasCreateChanges();
  // };

  // const hasCreateChanges = () => {
  //   return !(rows.length == 0 && head.project === "-1" && head.task === "");
  // };

  // const hasEditChanges = () => {
  //   return !(rows.length == 0 && head.project === "-1" && head.task === "");
  // };

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
  };
};

export default useDetails;
