import * as mongoose from "mongoose";
import { model } from "mongoose";
import { actionSchema, IAction } from "./entity/action.entity";

export async function run() {
  try {
    const Action = model<IAction>('Action', actionSchema);

    const action = new Action({
      credits: 30,
      name: 'A'
    })

    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(process.env.DATABASE ||
      'mongodb+srv://mongodb-user:vNXBObWAlXbs00Kv@atlascluster.1eln5es.mongodb.net/fifo-db?retryWrites=true&w=majority');

    await action.save();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.error(e);
  }
}
