import { Schema, model, models } from 'mongoose';

const AnnouncementSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

const ClubSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  announcements: [AnnouncementSchema],
  events: [EventSchema],
});

const Club = models.Club || model('Club', ClubSchema);

export default Club;
