import { getSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Login from "../components/Login";

export default function Home({ session }) {
  return !session ? (
    <Login />
  ) : (
    <div>
      <Head>
        <title>Facebook clone</title>
      </Head>
      <Header />

      {/* HEADER */}
      <main>
        {/* sidebar */}
        {/* newsfeed */}
        {/* widgets */}
      </main>
    </div>
  );
}

// a function to get user session , whether user is logged in or not
export async function getServerSideProps(context) {
  // get user session
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
