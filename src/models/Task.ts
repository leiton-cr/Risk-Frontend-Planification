import { Detail } from "./Detail";

export interface Task {
  id: string;
  projectId: string;
  taskId: string;
  taskDescription: string;
  details: Detail[];
}
