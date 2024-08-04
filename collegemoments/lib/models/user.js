import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  clubIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Club',
    },
  ],
});

const User = models.User || model('User', UserSchema);

export default User;
