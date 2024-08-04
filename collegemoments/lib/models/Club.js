// lib/models/Club.js
import { Schema, model, models } from "mongoose";

const ClubSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  image: String, // URL or base64 string for the club image
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  announcements: [
    {
      title: String,
      description: String,
      image: String // URL or base64 string for the announcement image
    }
  ],
  events: [
    {
      title: String,
      description: String,
      images: [String] // Array of URLs or base64 strings for event images
    }
  ]
});

const Club = models.Club || model("Club", ClubSchema);

export default Club;
