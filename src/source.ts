import { connect } from "mongoose";
import { connectionString } from "./config";
import User from "./entity/user/model/user.model";
import Action from "./entity/action/model/action.model";

export async function run() {
  try {
    await connect(connectionString);
    await User.createCollection();
    await Action.createCollection();
  } catch (e) {
    console.error(e);
  }
}
