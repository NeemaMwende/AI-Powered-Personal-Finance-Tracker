import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/utils/password";

export async function getUserFromDb(email: string, password: string) {
  // ✅ Define a custom type that includes `password`
  type UserWithPassword = {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string;
  };

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      //password: true, // ✅ Ensure password is included
    },
  }) as UserWithPassword | null; // ✅ Cast to our custom type

  if (!user || !user.password) {
    return null;
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  // ✅ Remove password before returning the user
  const { password: _ } = user; // eslint-disable-line @typescript-eslint/no-unused-vars

}
