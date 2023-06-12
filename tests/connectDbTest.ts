import mongoose, { connect, connection } from "mongoose";
import { connectionTestString } from "../src/config";
import userSchema from "../src/entity/user/model/user.model";
import actionSchema from "../src/entity/action/model/action.model";

export async function connectDBForTesting() {
  try {
    await connect(connectionTestString);

    const User = mongoose.model("User", userSchema);
    const Action = mongoose.model("Actions", actionSchema);

    await User.createCollection();
    await Action.createCollection();
  } catch (error) {
    console.log("DB connect error");
  }
}

export async function disconnectDBForTesting() {
  try {
    await connection.close();
  } catch (error) {
    console.log("DB disconnect error");
  }
}
