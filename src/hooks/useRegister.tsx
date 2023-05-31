import { Detail } from "../models/Detail.ts";
import { InputData } from "../models/InputData.ts";
import { Task } from "../models/Task.ts";

const useRegister = () => {
  const createRegister = (header: any, inputData: any): Task => {
    const newObject: Task = {
      id: header.id ? header.id : "string",
      projectId: header.project,
      taskId: header.taskId ? header.taskId : "string",
      taskDescription: header.taskDescription,
      details: [],
    };

    for (const item of inputData) {
      const detail: Detail = {
        id: item.id ? item.id : "string",
        riskDescription: item.riskDescription.val,
        impactDescription: item.impactDescription.val,
        probabilityId: item.probability.id,
        impactId: item.impact.id,
        owner: item.owner.val,
        responsePlan: item.responsePlan.val,
        priorityId: item.priority.val,
        points: item.points.val,
      };
      newObject.details.push(detail);
    }

    return newObject;
  };

  const editRegister = (data: any) => {
    const rows = [];

    const head = {
      id: data.id,
      project: data.projectId,
      taskId: data.taskId,
      taskDescription: data.taskDescription,
    };

    const details = data.tblDetails;
    for (const item of details) {
      const detail: InputData = {
        id: item.id,
        riskDescription: {
          id: item.riskDescription,
          val: item.riskDescription,
        },
        impactDescription: { id: item.impactId, val: item.impactDescription },
        probability: { id: item.probability.id, val: item.probability.id },
        impact: { id: item.impact.id, val: item.impact.id },
        owner: { id: "", val: item.owner },
        responsePlan: { id: "", val: item.responsePlan },
        priority: { id: item.priority.id, val: item.priority.id },
        points: { id: "", val: item.points },
      };
      rows.push(detail);
    }

    return { head, rows };
  };

  return { createRegister, editRegister };
};

export default useRegister;
