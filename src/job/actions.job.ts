import { CronJob } from "cron";
import { deleteActionUsers } from "../service/user/user.service";

const job = new CronJob("*/1 * * * * ", async () => {
  try {
    await deleteActionUsers();
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
});

export default job;
