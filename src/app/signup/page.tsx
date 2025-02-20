"use client";
import { useState } from "react";
import Link from "next/link";
import { SignInButton } from "../components/sign-in-button";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle sign-up logic (API call or auth function)
    console.log("Signing up with:", { name, email, password });
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">Or continue with</p>
        <SignInButton />
      </div>

      <p className="text-center text-gray-600 mt-4">
        Already have an account? <Link href="/loginform" className="text-blue-500 hover:underline">Log in</Link>
      </p>
    </div>
  );
}
