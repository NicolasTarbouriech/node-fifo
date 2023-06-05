import express from 'express';
import { run } from "./source";
import router from "./router";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(router);

app.listen(PORT, () => {
  run().catch(console.dir);
  console.log(`Server listening on ${PORT}`);
});
