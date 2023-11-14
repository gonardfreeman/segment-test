import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex gap-2 items-end">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">Create Track</h1>
        </Link>

        <nav className="ml-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blc-sign-up-track" className="hover:underline">
                Sign Up Track Manual
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
