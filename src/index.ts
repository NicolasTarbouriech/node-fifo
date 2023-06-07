import express from 'express';
import { run } from "./source";
import router from "./router";
import job from "./job/actions.job";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json())
app.use(router);
job.start();

app.listen(PORT, () => {
  run().catch(console.dir);
  console.log(`Server listening on ${PORT}`);
});
