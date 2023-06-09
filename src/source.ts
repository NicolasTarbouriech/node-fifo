import mongoose, { connect } from "mongoose";
import { connectionString } from "./config";
import userSchema from "./entity/user/model/user.model";
import actionSchema from "./entity/action/model/action.model";

export async function run() {
  try {
    await connect(connectionString);

    const User = mongoose.model('User', userSchema);
    const Action = mongoose.model('Actions', actionSchema);

    await User.createCollection();
    await Action.createCollection();
  } catch (e) {
    console.error(e);
  }
}
