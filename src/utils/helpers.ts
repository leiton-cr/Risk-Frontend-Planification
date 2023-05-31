/* eslint-disable @typescript-eslint/no-explicit-any */
export const emptyRowData =  {
    riskDescription: {
        id: "-1",
        val: ""
    },
    impactDescription: {
        id: "-1",
        val: ""
    },
    probability: {
        id: "-1",
        val: ""
    },
    impact: {
        id: "-1",
        val: ""
    },
    owner: {
        id: "-1",
        val: ""
    },
    responsePlan: {
        id: "-1",
        val: ""
    },
    priority: {
        id: "-1",
        val: ""
    },
    points: {
        id: "-1",
        val: ""
    },
}

export const creationHeaders = [
    "Risk Description",
    "Impact Description",
    "Probability",
    "Impact ",
    "Owner ",
    "Response Plan ",
    "Priority ",
    "Points ",
]

export const matrixcColHeaders = [
    "Rare",
    "Unlikely",
    "Moderate",
    "Likely",
    "AlmostCertain"
]

export const matrixRowHeaders = [
    " - ",
    "Insignificant",
    "Minor",
    "Significant",
    "Major",
    "Severe"
]

export const getPriority = (register:any) => {
    return register.priority.value+1;
}

export const getImpact = (register:any) => {
    return register.impact.value+1;
}