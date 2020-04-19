export interface Planification {
  annee: string;
  groups: PlanificationGroup[]
}

export interface PlanificationGroup {
  jour: string;
  notifications: Notification[];
}

export interface Notification {
  id: number;
  timeStart: string;
  timeEnd: string;
  name: string;
  location: string;
  description: string;
  assetNames: string[];
  tags: string[];
}
