import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { getAuthSession } from "@/lib/next-auth";
import { categorySchema } from "@/schemas/categorySchema";
import { revalidatePath, revalidateTag } from "next/cache";
// import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const parsedBody = categorySchema.safeParse(body);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return NextResponse.json(
      { error: "Invalid request", data: errors },
      { status: 400 }
    );
  }

  const { data } = parsedBody;
  const { name, imageUrl, imageId, quotes } = data;

  const categoryExist = await prisma.category.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (categoryExist) {
    return NextResponse.json(
      { error: "Category already exists" },
      { status: 400 }
    );
  }

  try {
    const response = await prisma.category.create({
      data: {
        name,
        imageUrl,
        imageId,
      },
    });

    if (response.id) {
      const quotesWithId = quotes.map((quote) => ({
        ...quote,
        categoryId: response.id,
      }));

      const quotesResponse = await prisma.quote.createMany({
        data: quotesWithId,
      });
    }

    revalidatePath("/", "layout");
    revalidateTag("categories");
    revalidateTag(`category-${name.toLowerCase()}`);
    revalidateTag("editorsChoice");

    return NextResponse.json({
      message: "Category created successfully",
      response,
    });
  } catch (error) {
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (error.code === "P2002") {
    //     return NextResponse.json(
    //       { error: "Category already exists" },
    //       { status: 400 }
    //     );
    //   }
    // }
    return NextResponse.json(
      { error: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const categoryId = searchParams.get("categoryId");

  if (typeof categoryId !== "string") {
    return NextResponse.json(
      { error: "Invalid Searchparams" },
      { status: 400 }
    );
  }

  const body = await request.json();

  const parsedBody = categorySchema.safeParse(body);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return NextResponse.json(
      { error: "Invalid request", data: errors },
      { status: 400 }
    );
  }

  const { data } = parsedBody;
  const { name, imageUrl, imageId, quotes } = data;

  const categoryResponse = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (categoryResponse?.name.toLowerCase() !== name.toLowerCase()) {
    const categoryExists = await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (categoryExists) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }
  }

  try {
    const response = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        imageUrl,
        imageId,
      },
    });

    if (response.id) {
      const quoteWithCategoryId = quotes.map((quote) => ({
        ...quote,
        categoryId: response.id,
      }));

      const quoteDeleteResponse = await prisma.quote.deleteMany({
        where: {
          categoryId: categoryId,
        },
      });

      const quotesResponse = await prisma.quote.createMany({
        data: quoteWithCategoryId,
      });
    }

    revalidatePath("/", "layout");
    revalidateTag("categories");
    revalidateTag(`category-${name.toLowerCase()}`);
    revalidateTag("editorsChoice");

    return NextResponse.json({
      message: "Category updated successfully",
      response,
    });
  } catch (error) {
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (error.code === "P2002") {
    //     return NextResponse.json(
    //       { error: "Category already exists" },
    //       { status: 400 }
    //     );
    //   }
    // }
    return NextResponse.json(
      { error: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { error: "Content can not be empty" },
      { status: 400 }
    );
  }

  if (Object.keys(body).length === 0) {
    return NextResponse.json(
      { error: "Object cannot be empty" },
      { status: 400 }
    );
  }

  if (Object.values(body).includes("")) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const { deleteId } = body;

  // return NextResponse.json({ success: deleteId }, { status: 200 });

  // const userCheckResponse = await prisma.user.findUnique({
  //   where: {
  //     id: session.user.id,
  //   },
  // });

  // if (!userCheckResponse) {
  //   return NextResponse.json(
  //     { error: "Unauthorized, User not found" },
  //     { status: 404 }
  //   );
  // }

  // if (userCheckResponse.password !== password) {
  //   return NextResponse.json(
  //     { error: "Unauthorized, Passwords don't match" },
  //     { status: 400 }
  //   );
  // }

  if (typeof deleteId === "string") {
    const responseCategory = await prisma.category.findUnique({
      where: {
        id: deleteId,
      },
      select: {
        imageId: true,
        name: true,
      },
    });

    const responsePostsImagesId = await prisma.post.findMany({
      where: {
        categoryName: responseCategory?.name,
      },
      select: {
        imageId: true,
      },
    });

    const categoryImageId = responseCategory?.imageId;

    const postsImagesIds = responsePostsImagesId.map(
      (response) => response.imageId
    );

    const imageIds = [...postsImagesIds, categoryImageId].filter(
      (imageId): imageId is string => imageId !== null
    );

    // return NextResponse.json({ success: imageIds }, { status: 200 });

    try {
      const response = await prisma.category.delete({
        where: {
          id: deleteId,
        },
      });

      if (response && imageIds.length > 0) {
        const imagesDeleteResponse = await cloudinary.v2.api.delete_resources(
          imageIds
        );
      }

      revalidateTag("categories");
      revalidateTag(`category-${responseCategory?.name.toLowerCase()}`);
      revalidateTag("editorsChoice");

      return NextResponse.json(
        { success: "Category deleted", response },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong", data: error },
        { status: 500 }
      );
    }
  }

  // if (Array.isArray(deleteId)) {
  //   const responseProfileImageIds = await prisma.profile.findMany({
  //     where: {
  //       userId: {
  //         in: deleteId,
  //       },
  //     },
  //     select: {
  //       imageId: true,
  //     },
  //   });

  //   const responsePostsImagesIds = await prisma.post.findMany({
  //     where: {
  //       userId: {
  //         in: deleteId,
  //       },
  //     },
  //     select: {
  //       imageId: true,
  //     },
  //   });

  //   const profileImageIds = responseProfileImageIds
  //     .map((response) => response.imageId)
  //     .filter((imageId): imageId is string => imageId !== null);

  //   const postsImagesIds = responsePostsImagesIds.map(
  //     (response) => response.imageId
  //   );

  //   // const imageIds = postsImagesIds.concat(profileImageIds);
  //   const imageIds = [...postsImagesIds, ...profileImageIds];

  //   // return NextResponse.json({ success: imageIds }, { status: 200 });

  //   try {
  //     const response = await prisma.user.deleteMany({
  //       where: {
  //         id: {
  //           in: deleteId,
  //         },
  //       },
  //     });

  //     if (response && imageIds.length > 0) {
  //       const imagesDeleteResponse = await cloudinary.v2.api.delete_resources(
  //         imageIds
  //       );
  //     }

  //     return NextResponse.json(
  //       { success: "account deleted", response },
  //       { status: 200 }
  //     );
  //   } catch (error) {
  //     return NextResponse.json(
  //       { error: "account delete failed" },
  //       { status: 400 }
  //     );
  //   }
  // }
}
