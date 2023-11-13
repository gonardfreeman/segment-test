import { BLC_SIGN_UP_TRACK_INPUTS } from "@/data/tracks/blcSignUp";
import dynamic from "next/dynamic";
import Head from "next/head";

const ManualFormComponent = dynamic(
  () => import("./components/blc-sign-up-manual"),
  {
    ssr: false,
  }
);

function ManualMode() {
  return (
    <>
      <Head>
        <title>Manual Segment SignUp Track Generation</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24 ">
        <h1 className="text-xl color-slate-800">Manual Mode</h1>
        <ManualFormComponent inputs={BLC_SIGN_UP_TRACK_INPUTS} />
      </main>
    </>
  );
}

export default ManualMode;
