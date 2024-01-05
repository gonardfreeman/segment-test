import { BLC_SIGN_UP_TRACK_INPUTS } from "@/data/tracks/blcSignUp";
import dynamic from "next/dynamic";
import Head from "next/head";

import { useRouter } from "next/router";

import { useState, useEffect } from "react";

const ManualFormComponent = dynamic(
  () => import("./components/blc-sign-up-manual"),
  {
    ssr: false,
  }
);

function ManualMode() {
  const [isLoggedIn, setLogin] = useState<boolean>(false);
  const [once, setOnce] = useState<boolean>(false);
  const router = useRouter();
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
  }, [once]);
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
        <title>Manual Segment SignUp Track Generation</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24 ">
        <h1 className="text-xl color-slate-800">
          Manual Segment SignUp Track Generation
        </h1>
        <ManualFormComponent inputs={BLC_SIGN_UP_TRACK_INPUTS} />
      </main>
    </>
  );
}

export default ManualMode;
