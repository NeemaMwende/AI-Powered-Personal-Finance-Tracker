"use server";

import { signIn, signOut } from "@/auth";

export const loginWithGitHub = async () => {
  try {
    await signIn("github", { redirectTo: "/dashboard" });
  } catch (error) {
    console.error("GitHub login error:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
