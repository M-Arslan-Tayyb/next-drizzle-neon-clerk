"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { user } = useUser();
  console.log("user", user);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow">
      <Link href="/" className="text-xl font-bold">
        NotesApp
      </Link>

      <div className="flex items-center gap-4 ">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          {/* If not signed in, show links to sign in / sign up */}
          <Link href="/sign-in">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Sign Up
            </button>
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}
