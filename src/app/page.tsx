"use server"
import { auth } from "@/auth";
import { SignInButton } from "./components/sign-in-button";
import Link from "next/link";
import { SignOutButton } from "./components/sign-out-button";

export default async function Home() {
  const session = await auth();
 
  if (session?.user) {
    return ( 
      <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h2 className="text-2xl font-bold mb-4">Welcome, {session.user.name}</h2>
        <Link href="/user-info" className="text-blue-500 hover:underline">User Info</Link>
        <SignOutButton />
      </div>
    ) 
  }

  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p> You are not Signed In</p>
        <SignInButton/>
    </div>
  );
}
