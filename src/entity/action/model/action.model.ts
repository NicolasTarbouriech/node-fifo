import { Schema } from "mongoose";
import {
  actionTypeEnum,
  IAction,
  IActionModel,
} from "../interface/action.interface";

const actionSchema = new Schema<IAction, IActionModel>(
  {
    type: {
      type: String,
      enum: actionTypeEnum,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default actionSchema;
