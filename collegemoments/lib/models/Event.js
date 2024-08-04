// models/Event.js
import { Schema, model, models } from 'mongoose';

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  images: [String] // Array of image URLs
});

const Event = models.Event || model('Event', EventSchema);

export default Event;
