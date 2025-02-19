import { auth } from "@/auth";
import Image from "next/image";
import { SignOutButton } from "../components/sign-out-button";

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
         <SignOutButton/>
      </div>
     
    ) 
  }
}
