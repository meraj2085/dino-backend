import { Schema, model } from 'mongoose';
import { EventModel, IEvent } from './event.interface';

const eventSchema = new Schema<IEvent>(
  {
    from_date: { type: String, required: true },
    to_date: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Event = model<IEvent, EventModel>('Event', eventSchema);
