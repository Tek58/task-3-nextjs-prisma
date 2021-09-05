import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, content } = req.body;

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      user: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
