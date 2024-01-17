"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function deleteReplyAdmin({
  deleteId,
}: {
  deleteId: string | string[];
}) {
  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
    return { error: "Unauthorized" };
  }

  if (!deleteId) {
    return { error: "Need to pass comment reply id" };
  }

  if (typeof deleteId === "string") {
    try {
      const response = await prisma.commentReply.delete({
        where: {
          id: deleteId,
        },
      });

      revalidatePath("/", "layout");

      return { success: "Reply deleted successfully", data: response };
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong", data: error };
    }
  }

  if (Array.isArray(deleteId)) {
    try {
      const response = await prisma.commentReply.deleteMany({
        where: {
          id: {
            in: deleteId,
          },
        },
      });

      revalidatePath("/", "layout");

      return {
        success: `${deleteId.length} reply deleted successfully`,
        data: response,
      };
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong", data: error };
    }
  }
}

export type deleteReplyAdminProps = typeof deleteReplyAdmin;
