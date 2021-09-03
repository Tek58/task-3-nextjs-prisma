import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

function Post({ post }) {
  const authorName = post.user ? post.user.name : "Unknown author";
  return (
    <div
      className="bg-white shadow-lg px-5 py-5 mb-3"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <h2 className="text-2xl pb-3 italic font-semibold">{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown source={post.content} />
    </div>
  );
}

export default Post;
