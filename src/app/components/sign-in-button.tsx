"use client";

import { loginWithGitHub, loginWithGoogle } from "@/lib/actions/auth";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const SignInButton = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      {/* GitHub Login Button */}
      <button
        onClick={loginWithGitHub}
        className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
      >
        <FaGithub className="text-xl" />
        Sign In with GitHub
      </button>

      {/* Google Login Button */}
      <button
        onClick={loginWithGoogle}
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition duration-300"
      >
        <FaGoogle className="text-xl text-red-500" />
        Sign In with Google
      </button>
    </div>
  );
};
