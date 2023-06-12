import { connect, connection } from "mongoose";
import { connectionString } from "../src/config";

export async function connectDBForTesting() {
  try {
    await connect(connectionString);
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
