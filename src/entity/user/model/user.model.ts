import { Schema } from "mongoose";
import { IUser } from "../interface/user.interface";

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  credits: {
    type: Schema.Types.Mixed,
    required: true,
  },
  queue: [
    {
      type: Schema.Types.ObjectId,
      ref: "Actions",
      default: []
    },
  ],
}, {
  timestamps: true
});

export default userSchema;
