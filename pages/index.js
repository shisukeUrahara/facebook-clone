import { getSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { db } from "../firebase";

export default function Home({ session, posts }) {
  return !session ? (
    <Login />
  ) : (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook clone</title>
      </Head>
      <Header />

      {/* HEADER */}
      <main className="flex ">
        {/* sidebar */}
        <Sidebar />
        {/* newsfeed */}
        <Feed posts={posts} />
        {/* widgets */}
        <Widgets />
      </main>
    </div>
  );
}

// a function to get user session , whether user is logged in or not
export async function getServerSideProps(context) {
  // get user session
  const session = await getSession(context);

  // pre fetching the posts
  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();

  // formatting the fetching posts in a human readable form
  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  return {
    props: {
      session,
      posts: docs,
    },
  };
}
