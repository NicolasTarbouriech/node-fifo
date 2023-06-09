import { Schema } from "mongoose";
import { IAction, IActionModel } from "../interface/action.interface";
import { TypeAction } from "../../../type/action.type";

const actionSchema = new Schema<IAction, IActionModel>({
    type: {
      type: String,
      enum: ['A', 'B', 'C'] as TypeAction[],
      required: true
    },
    credits: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }, {
    timestamps: true
  }
);

export default actionSchema;
