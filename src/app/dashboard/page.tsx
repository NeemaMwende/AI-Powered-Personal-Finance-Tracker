import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export default async function DashboardPage() {
  const session: Session | null = await auth();

  if (!session) {
    redirect("/loginform");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {session.user?.name || 'User'}!</p>
    </div>
  );
}