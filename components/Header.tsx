import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";

function Header() {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [session, loading] = useSession();

  let left = (
    <div className="flex space-x-7">
      <div>
        <a href="#" className="flex items-center py-4 px-2">
          <span className="font-semibold text-gray-500 text-lg"></span>
        </a>
      </div>
    </div>
  );

  let right = null;

  if (loading) {
    left = (
      <div className="flex space-x-7">
        <div>
          <a href="#" className="flex items-center py-4 px-2">
            <span className="font-semibold text-gray-500 text-lg"></span>
          </a>
        </div>
      </div>
    );
    right = (
      <div className="hidden md:flex items-center space-x-3 ">
        <p>validating session</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="hidden md:flex items-center space-x-3 ">
        <Link href="/signup">
          <a
            data-active={isActive("/signup")}
            className="py-2 px-2 font-medium text-white bg-gray-500 rounded hover:bg-black-400 transition duration-300"
          >
            Sign Up
          </a>
        </Link>

        <Link href="/api/auth/signin">
          <a
            data-active={isActive("/signup")}
            className="py-2 px-2 font-medium text-white bg-gray-500 rounded hover:bg-black-400 transition duration-300"
          >
            Log in
          </a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="flex space-x-7">
        <div>
          <p className="flex items-center py-4 px-2">
            <span className="font-semibold text-gray-500 text-lg">
              {session.user.name}
            </span>
          </p>
        </div>
      </div>
    );
    right = (
      <div className="hidden md:flex items-center space-x-3 ">
        <Link href="/create">
          <a
            data-active={isActive("/create")}
            className="py-2 px-2 font-medium text-white bg-gray-500 rounded hover:bg-black-400 transition duration-300"
          >
            New Post
          </a>
        </Link>
        <button
          onClick={() => signOut()}
          className="py-2 px-2 font-medium text-white bg-gray-500 rounded hover:bg-black-400 transition duration-300"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <nav className="bg-white shadow-lg py-2">
      <div className="max-w-8xl mx-auto px-5">
        <div className="flex justify-between">
          {left}
          {right}
        </div>
      </div>
    </nav>
  );
}

export default Header;
