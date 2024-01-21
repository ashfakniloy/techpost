import { prisma } from "@/lib/prisma";

export async function getAllUsersPath() {
  const usersName = await prisma.user.findMany({
    select: {
      username: true,
    },
  });

  const usersPath = usersName.map((user) => {
    return {
      username: user.username.replace(" ", "%20").toLowerCase(),
    };
  });

  return { usersPath };
}
