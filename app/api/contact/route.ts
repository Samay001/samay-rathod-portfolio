import { Resend } from "resend";

type ContactBody = { name?: string; email?: string; subject?: string; message?: string };

export async function POST(request: Request) {
  const body = await request.json() as ContactBody;
  const name = body.name?.trim();
  const email = body.email?.trim();
  const subject = body.subject?.trim();
  const message = body.message?.trim();
  if (!name || !email || !subject || !message) return Response.json({ error: "All fields are required." }, { status: 400 });

  const recipient = process.env.CONTACT_EMAIL || "samayrathod1@gmail.com";
  if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL && process.env.CONTACT_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: recipient,
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return Response.json({ sent: true });
  }

  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Samay,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
  return Response.json({ sent: false, mailto });
}
