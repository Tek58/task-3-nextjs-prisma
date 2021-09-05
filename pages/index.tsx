import React, { useState } from "react";
import { GetServerSideProps } from "next"
import Layout from "../components/Layout";
import prisma from '../lib/prisma';
import Post, { PostProps } from "../components/Post"
import Router from "next/router";
import { useSession, getSession } from 'next-auth/client';
import { session } from "next-auth/client";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 401;
    return { props: { newPosts: [] } };
  }

  const newPosts = await prisma.post.findMany({
    where: {
      user: { email: session.user.email },
    },
    include: {
      user: {
        select: { name: true },
      },
    },
  });
  return {
    props: { newPosts },
  };
};

type Props = {
  newPosts: PostProps[];
};

function Posts (props) {
  const [session] = useSession();

  if (!session) {
    return (
      <Layout>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-screen-lg ">
        <h1 className="text-5xl pb-3 italic font-semibold text-center">My Posts</h1>
        <main >
          {props.newPosts.map((post) => (
            <div key={post.id} className="pl-2">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Posts;
