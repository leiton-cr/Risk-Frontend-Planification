import { Detail } from "../models/Detail.ts";
import { Task } from "../models/Task.ts";

const useRegister = () => {
  const createRegister = (header: any, inputData: any): Task => {
    const newObject: Task = {
      id: "string",
      projectId: header.project,
      taskId: "string",
      taskDescription: header.task,
      details: [],
    };

    for (const item of inputData) {
      const detail: Detail = {
        id: "string",
        riskDescription: item.riskDescription.val,
        impactDescription: item.impactDescription.val,
        probabilityId: item.probability.id,
        impactId: item.impact.id,
        owner: item.owner.val,
        responsePlan: item.responsePlan.val,
        priorityId: item.priority.id,
        points: item.points.val,
      };
      newObject.details.push(detail);
    }

    return newObject;
  };

  return { createRegister };
};

export default useRegister;
