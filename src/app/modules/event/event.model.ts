import { Schema, model } from 'mongoose';
import { EventModel, IEvent } from './event.interface';

const eventSchema = new Schema<IEvent>(
  {
    organization_id: { type: String, required: true },
    from_date: { type: String, required: true },
    to_date: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['event', 'holiday'], required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Event = model<IEvent, EventModel>('Event', eventSchema);
