export interface TEventModel {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  startDate: string;
  startHour?: string;
  endDate: string;
  endHour?: string;
  type?: string;
  image: string | File;
  linkRegister?: string;
  location?: string;
}

export interface TEventDeleteModel {
  id: string;
}

export const EVENT_TYPE = {
  COMPLETED: 'completed',
  ON_GOING: 'ongoing',
  FUTURE: 'future',
  ALL: 'all'
};

export type EVENT_TYPE = (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE];

export const statusText = {
  completed: 'Évènement terminé',
  future: 'À venir',
  ongoing: 'En cours'
};

export const statusColor = {
  completed: 'bg-green-400',
  future: 'bg-blue-400',
  ongoing: 'bg-yellow-400'
};

export type StatusKey = keyof typeof statusColor;
