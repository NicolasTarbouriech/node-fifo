import express from "express";
import { run } from "./source";
import router from "./router";
import { startCronJob } from "./job/actions.job";
import { PORT } from "./config";
import { Server } from "socket.io"
import * as http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(router);

io.on('connection', (socket) => {
  console.log('connection socket working !')
});

app.listen(PORT, () => {
  run().catch(console.dir);
  console.log(`Server listening on ${PORT}`);
});

startCronJob(io);
