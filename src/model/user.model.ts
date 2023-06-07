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
  lastUpdatedAt: {
    type: Date,
    required: true,
  },
  queue: [
    {
      type: Schema.Types.ObjectId,
      ref: "Actions",
      default: []
    },
  ],
});

export default userSchema;
