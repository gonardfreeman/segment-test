import dynamic from "next/dynamic";
import Head from "next/head";

const NoSSR = dynamic(() => import("./components/clicker"), { ssr: false });

function Home() {
  return (
    <>
      <Head>
        <title>Random Track Generator</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24 ">
        <div>
          <h1 className="text-xl color-slate-800 font-bold">
            Create Random Signup Track
          </h1>
          <NoSSR />
        </div>
      </main>
    </>
  );
}

export default Home;
