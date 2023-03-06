import { PRIORITIES, iChecklistItem, iTag, ATTRIBUTE } from '../../../utils';

export enum FREQUENCY {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly',
}

export interface iDailyResponse {
  success: boolean;
  data: [
    {
      repeat: {
        m: boolean;
        t: boolean;
        w: boolean;
        th: boolean;
        f: boolean;
        s: boolean;
        su: boolean;
      };
      challenge: Partial<{
        taskId: string;
        id: string;
        shortName: string;
      }>;
      group: {
        completedBy: {};
        assignedUsers: [];
      };
      frequency: string;
      everyX: number;
      streak: number;
      nextDue: string[];
      yesterDaily: boolean;
      history: {
        date: number;
        value: number;
        isDue: boolean;
        completed: boolean;
      }[];
      completed: boolean;
      collapseChecklist: boolean;
      type: string;
      notes: string;
      tags: string[];
      value: number;
      priority: number;
      attribute: string;
      byHabitica: boolean;
      startDate: string;
      daysOfMonth: [];
      weeksOfMonth: [];
      checklist: {
        completed: boolean;
        text: string;
        id: string;
      }[];
      reminders: [];
      createdAt: string;
      updatedAt: string;
      _id: string;
      text: string;
      userId: string;
      isDue: boolean;
      id: string;
    },
  ];
  notifications: [
    {
      type: string;
      data: {
        headerText: string;
        bodyText: string;
      };
      seen: boolean;
      id: string;
    },
  ];
  appVersion: string;
}

export interface iDailys {
  text: string;
  notes: string;
  id: string;
  checklist: Array<iChecklistItem>;
  attribute: ATTRIBUTE;
  daysOfMonth: number[];
  weeksOfMonth: number[];
  priority: PRIORITIES;
  tags: Array<iTag>;
  isDue: boolean;
  completed: boolean;
  frequency: FREQUENCY;
  everyX: number;
  streak: number;
  repeat: {
    m: boolean;
    t: boolean;
    w: boolean;
    th: boolean;
    f: boolean;
    s: boolean;
    su: boolean;
  };
}

export interface ICreateDailyProps {
  text: string;
  type: string;
  notes: string;
  tags: string[];
  priority: PRIORITIES;
  attribute: ATTRIBUTE;
}
