// models/Event.js
import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  clubId: {
    type: Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  images: [
    {
      type: String
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
