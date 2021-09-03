import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === "DELETE") {
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    });
    res.json(post);
  }
  if (req.method === "PATCH") {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
