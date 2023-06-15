import { CronJob } from "cron";
import { Server } from "socket.io";
import { deleteActionUsers } from "../service/user.service";

export function startCronJob(io: Server) {
  const job = new CronJob("*/1 * * * * ", async () => {
    try {
      await deleteActionUsers(io);
    } catch (error) {
      console.error("Error executing cron job:", error);
    }
  });

  job.start();
}
