// models/Club.js
import { Schema, model, models } from "mongoose";

const ClubSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  announcements: [
    {
      type: String
    }
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
});

const Club = models.Club || model("Club", ClubSchema);

export default Club;
