import { Model } from 'mongoose';

/* eslint-disable no-unused-vars */
export enum type {
  EVENT = 'event',
  HOLIDAY = 'holiday',
}

export type IEvent = {
  organization_id: string;
  from_date: string;
  to_date: string;
  title: string;
  type?: type;
};

export type EventModel = Model<IEvent, Record<string, unknown>>;

export type IEventFilters = {
  searchTerm?: string;
  id?: string;
  from_date?: string;
  to_date?: string;
  type?: string;
};
