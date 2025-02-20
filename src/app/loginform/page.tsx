"use client";
import { useState } from "react";
import { SignInButton } from "../components/sign-in-button";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle login logic (API call or auth function)
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="w-full max-w-md p-8 bg-white  rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">Or continue with</p>
        <SignInButton />
      </div>

      <p className="text-center text-gray-600 mt-4">
        No account? <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
