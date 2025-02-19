"use server"
import { auth } from "@/auth";
import { SignInButton } from "./components/sign-in-button";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
 
  if (session?.user) {
    return ( 
      <div>
        {" "}
        <h1>Signin Successful</h1>
        <p>User signed in with name: {session.user.name}</p>
         <p>User signed in with email: {session.user.email}</p>
         {session.user.image && (
        <Image 
          src={session.user.image} 
          alt="Profile pic" 
          width={80} 
          height={80} 
          style={{borderRadius: "50%"}}
        />
      )}

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
