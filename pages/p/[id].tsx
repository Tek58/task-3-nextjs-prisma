import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/client";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

function Post(props) {
  const [session, loading] = useSession();
  if (loading) {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;

  return (
    <Layout>
      <div className="w-full shadow-lg max-w-screen-lg px-5 py-5">
        <h2 className="text-2xl pb-3 italic font-semibold">{title}</h2>
        <p >By {props?.user?.name || "Unknown author"}</p>
        <ReactMarkdown source={props.content} />
        <button
          onClick={() => {
            Router.push({
              pathname: "/edit/[id]",
              query: { id: props.id },
            });
          }}
          className="py-2 px-2 mr-3 mt-3 font-medium text-white bg-blue-500 rounded hover:bg-black-400 transition duration-300"
        >
          Edit
        </button>

        <button
          onClick={() => deletePost(props.id)}
          className="py-2 px-2 mt-3 font-medium text-white bg-blue-500 rounded hover:bg-black-400 transition duration-300"
        >
          Delete
        </button>
      </div>
    </Layout>
  );
}

export default Post;

function pathname(pathname: any): void {
  throw new Error("Function not implemented.");
}
