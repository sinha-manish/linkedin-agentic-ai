import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function sendDigestEmail(
  userEmail: string,
  summary: string,
  feed: any[]
) {
  const htmlFeed = feed
    .slice(0, 5)
    .map(
      p => `
      <div style="margin-bottom:20px">
        <strong>Post:</strong><br>
        ${p.content}<br><br>
        <em>Why you received this:</em><br>
        ${p.explanation?.join("<br>") || "Relevant to your interests"}
      </div>
    `
    )
    .join("");

  const html = `
    <h2>Your Daily AI Feed Digest</h2>
    <p>${summary}</p>
    <hr />
    <h3>Top Posts For You</h3>
    ${htmlFeed}
    <br><br>
    <small>Powered by your LinkedIn Agentic AI.</small>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: "Your Daily AI Feed Digest",
    html
  });
}
