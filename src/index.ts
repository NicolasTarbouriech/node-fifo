import express, { Request, Response } from 'express';
import { run } from "./source";

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api", (req: Request, res: Response) => {
  let json = {
    message: 'sq'
  }
  res.json(json);
});

app.listen(PORT, () => {
  run().catch(console.dir);
  console.log(`Server listening on ${PORT}`);
});
