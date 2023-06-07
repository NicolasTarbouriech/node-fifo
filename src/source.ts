import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv';
import express from "express";
import userSchema from "./model/user.model";
import actionSchema from "./model/action.model";

export async function run() {
  try {
    const app = express();
    app.use(express.json());

    dotenv.config();

    const connectionString = process.env.DATABASE || 'mongodb+srv://mongodb-user:vNXBObWAlXbs00Kv@atlascluster.1eln5es.mongodb.net/fifo-db?retryWrites=true&w=majority';

    await connect(connectionString);

    const User = mongoose.model('User', userSchema);
    const Action = mongoose.model('Actions', actionSchema);

    await User.createCollection();
    await Action.createCollection();

    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });

  } catch (e) {
    console.error(e);
  }
}
