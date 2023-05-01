import { Schema } from "mongoose";

export interface IAction {
  name: {
    type: String,
    enum : ['A','B', 'C'],
    default: 'A'
  },
  credits: Number;
}

export const actionSchema = new Schema<IAction>({
  name: { type: String, enum: ['A','B', 'C'], default: 'A', required: true },
  credits: { type: Number, required: true },
});


