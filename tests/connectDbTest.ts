import { connect, connection } from "mongoose";
import { connectionTestString } from "../src/config";
import User from "../src/entity/user/model/user.model";
import Action from "../src/entity/action/model/action.model";

export async function connectDBForTesting() {
  try {
    await connect(connectionTestString);
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
