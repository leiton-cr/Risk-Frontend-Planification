/* eslint-disable @typescript-eslint/no-explicit-any */
export const emptyRowData = {
  riskDescription: {
    id: "-1",
    val: "",
  },
  impactDescription: {
    id: "-1",
    val: "",
  },
  probability: {
    id: "-1",
    val: "",
  },
  impact: {
    id: "-1",
    val: "",
  },
  owner: {
    id: "-1",
    val: "",
  },
  responsePlan: {
    id: "-1",
    val: "",
  },
  priority: {
    id: "-1",
    val: "-1",
  },
  points: {
    id: "-1",
    val: "",
  },
};

export const creationHeaders = [
  "Risk Description",
  "Impact Description",
  "Probability",
  "Impact ",
  "Owner ",
  "Response Plan ",
  "Priority ",
  "Points ",
  "Delete",
];

export const ENV = {
  BASE_URL: `https://localhost:7071/`,
};

export const matrixcColHeaders = [
  "Rare",
  "Unlikely",
  "Moderate",
  "Likely",
  "AlmostCertain",
];

export const tableHeaders = [
  "PID",
  "PROJECT",
  "TID",
  "TASK",
  "RISK COUNT",
  "TOTAL POINTS",
  "LAST UPDATE",
  "MATRIX",
  "EDIT",
  "DELETE",
];

export const matrixRowHeaders = [
  " - ",
  "Insignificant",
  "Minor",
  "Significant",
  "Major",
  "Severe",
];

export const getPriority = (register: any) => {
  return register.priority.value + 1;
};

export const getImpact = (register: any) => {
  return register.impact.value + 1;
};

export const totalPoints = (projects: any) => {
  return projects.tblDetails.reduce(
    (sum: any, detail: any) => sum + detail.points,
    0
  );
};
