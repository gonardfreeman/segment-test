import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./components/clicker"), { ssr: false });

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24 ">
      <h1 className="text-xl color-slate-800">Hello clicker</h1>
      <NoSSR />
    </main>
  );
}

export default Home;
