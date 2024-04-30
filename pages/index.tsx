import Header from "@/components/Header";
import PostBox from "@/components/PostBox";
import Head from "next/head";

export default function Home() {
  return (
    <main className="my-7 mx-auto max-w-6xl ">
      <Head>
        <title>Reddit-Clone</title>
      </Head>
      <PostBox />
      <div className="flex">
        {/* Feed */}
        
      </div>
    </main>
  );
}
