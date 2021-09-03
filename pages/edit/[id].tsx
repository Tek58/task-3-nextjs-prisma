import React, { useState } from "react";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import prisma from "../../lib/prisma";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return {
    props: post,
  };
};

function NewPost(props) {
  const [session, loading] = useSession();
  if (loading) {
    return <div>Authenticating ...</div>;
  }
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch(`http://localhost:3000/api/post/${props.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-screen-lg">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={submitData}
        >
          <h1 className="text-5xl pb-5 italic font-semibold">Edit Post</h1>
          <input
            className="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3  focus:outline-none focus:shadow-outline"
            id="title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder={props.title}
            type="text"
            value={title}
          />
          <textarea
            className="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3  focus:outline-none focus:shadow-outline"
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder={props.content}
            rows={8}
            value={content}
          />
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded focus:outline-none focus:shadow-outline"
            disabled={!content || !title}
            type="submit"
            value="Edit"
          />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  );
}

export default NewPost;
