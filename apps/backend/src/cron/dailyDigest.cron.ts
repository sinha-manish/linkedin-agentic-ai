import cron from "node-cron";
import { sendDailyDigestToAllUsers } from "../services/dailyDigest.service";

// Run everyday at 8:00 AM
cron.schedule("0 8 * * *", async () => {
  console.log("⏰ Running Daily Feed Digest Cron...");
  await sendDailyDigestToAllUsers();
});
