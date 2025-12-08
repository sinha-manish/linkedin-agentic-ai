import { generateForYouFeed } from "./feed.service";
import { generateDigestSummary } from "../utils/digestSummary";
import { sendDigestEmail } from "../utils/email";
const db = require("../../sequelize/models");

export async function sendDailyDigestToAllUsers() {
  const users = await db.UserMemory.findAll(); // all known users
  
  for (const user of users) {
    try {
      const userId = user.user_id;

      // Step 1: Generate feed for user
      const feed = await generateForYouFeed(userId, "ai tech future");

      // Step 2: Generate AI summary
      const summary = await generateDigestSummary(feed);

      // Step 3: Send email
      await sendDigestEmail(userId, summary, feed);

      console.log(`📨 Digest sent to user: ${userId}`);
    } catch (err) {
      console.error(`❌ Error sending digest to user ${user.user_id}:`, err);
    }
  }
}
