import { CronJob } from "cron";
import { deleteActionUsers } from "../service/user/user.service";
import { Server } from "socket.io";

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
