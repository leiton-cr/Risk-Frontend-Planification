export interface InputData {
  id?: string,
  riskDescription: { id: string; val: string };
  impactDescription: { id: string; val: string };
  probability: { id: string; val: string };
  impact: { id: string; val: string };
  owner: { id: string; val: string };
  responsePlan: { id: string; val: string };
  priority: { id: string; val: string };
  points: { id: string; val: number };
}
