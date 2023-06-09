import express from "express";
import { run } from "./source";
import router from "./router";
import job from "./job/actions.job";
import { PORT } from "./config";

const app = express();
app.use(express.json());
app.use(router);
job.start();

app.listen(PORT, () => {
  run().catch(console.dir);
  console.log(`Server listening on ${PORT}`);
});
