import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";

const NoSSR = dynamic(() => import("./components/clicker"), { ssr: false });

function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isLoggedIn, setLogin] = useState<boolean>(false);
  const [once, setOnce] = useState<boolean>(false);
  const router = useRouter();
  console.log(router);
  console.log(searchParams);

  useEffect(() => {
    async function handleLoadAnalytics() {
      try {
        const resp = await (
          await fetch(
            `/api/checkCredentials?user=${router.query.user}&password=${router.query.password}`
          )
        ).json();
        setLogin(resp.result === true);
      } catch (err) {
        console.log(err);
        setLogin(false);
        setOnce(false);
      }
    }
    handleLoadAnalytics().catch((err) => console.log(err));
  }, [once, router]);
  if (!isLoggedIn) {
    return (
      <>
        <div>Please Login</div>
      </>
    );
  }
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
