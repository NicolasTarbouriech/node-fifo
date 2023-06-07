import { Schema } from "mongoose";
import { IAction, IActionModel } from "../interface/action.interface";

const actionSchema = new Schema<IAction, IActionModel>({
  type: {
    type: String,
    enum: ['A', 'B', 'C'],
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

export default actionSchema;
