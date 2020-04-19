import { Notification } from './Planification';
export interface NotificationGroup {
  startTime: string;
  notifications: Notification[];
}
