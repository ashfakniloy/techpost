"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import parser from "html-react-parser";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";

function PostPreviewPage() {
  const router = useRouter();

  const { data: session } = useSession();

  console.log("session is", session);

  const currentDate = new Date();

  const [previewPost, setPreviewPost] = useState({
    title: "",
    categoryName: "",
    imageUrl: "",
    imageId: "",
    article: "",
  });

  useEffect(() => {
    // const persistedPost = JSON.parse(localStorage.getItem("newPost") || "");

    const persistedPost = localStorage.getItem("draftPost");
    const parsedPost = persistedPost && JSON.parse(persistedPost || "");
    setPreviewPost(parsedPost);
  }, []);

  useEffect(() => {
    const persistedPost = localStorage.getItem("draftPost");
    const parsedPost = persistedPost && JSON.parse(persistedPost || "");
    console.log(parsedPost);

    const regex = /(<([^>]+)>)/gi;
    const hasArticle = !!parsedPost.article.replace(regex, "").length;

    if (!parsedPost || Object.values(parsedPost).includes("") || !hasArticle)
      router.replace("/add-post");
  }, [previewPost]);

  if (!previewPost) return;

  const handlePublish = async () => {
    // console.log("previewPost", previewPost);
    const toastPublish = toast.loading("Loading...");

    const url = "/api/post";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(previewPost),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Post created successfully", {
        id: toastPublish,
      });
      console.log("success", data);
      const postId = data.response.id;
      // router.refresh();
      // router.push(`/post/${postId}`);
      router.replace(`/post/${postId}`);

      // setDraftPost("");
      localStorage.removeItem("draftPost");
    } else {
      toast.error(`${data.error}`, {
        id: toastPublish,
      });
      console.log("error", data);
    }
  };

  return (
    <div className=" max-w-full lg:max-w-[796px]">
      <h3 className="mb-3 text-[22px] lg:text-2xl text-center lg:text-start font-extrabold text-gray-700 font-montserrat dark:text-gray-400">
        Post Preview
      </h3>

      <div className="mb-4 text-gray-700 dark:text-gray-300 capitalize">
        {previewPost.categoryName}
      </div>

      <div className="">
        <div className="flex flex-col min-h-[100px] lg:min-h-[135px]">
          <h1
            className={`text-2xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 font-montserrat `}
          >
            {previewPost.title}
          </h1>

          <div className="ml-2 lg:ml-0 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 lg:gap-10 mt-3 lg:mt-5">
              <div className="flex items-center gap-3  lg:gap-6 ">
                <div className="flex items-center gap-2">
                  <div className="">
                    {session?.user.imageUrl ? (
                      <Image
                        src={session.user.imageUrl}
                        alt="user image"
                        width={35}
                        height={35}
                        className="rounded-full"
                      />
                    ) : (
                      <Image
                        src="/images/blankUser.jpg"
                        alt="user image"
                        width={35}
                        height={35}
                        className="rounded-full"
                      />
                    )}
                  </div>

                  <p className=" ">
                    By <span className="">{session?.user.username}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2.5 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 lg:gap-0">
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0">
                <p>
                  <span>Published: </span>
                  <ClientFormattedDate date={currentDate} />
                </p>
              </div>
            </div>
          </div>
        </div>

        {previewPost.imageUrl && (
          <div className="mt-5 h-[280px] lg:h-[470px] relative">
            <Image
              src={previewPost.imageUrl}
              alt="image"
              fill
              className="object-cover"
            />
          </div>
        )}

        <p className="mt-6 ProseMirror !border-none !p-0 !max-h-full">
          {parser(previewPost.article || "")}
        </p>
      </div>

      <div className="flex justify-between mt-5 mb-5">
        <Link href="/add-post">
          <button className="px-6 py-2.5 text-sm font-bold text-black bg-gray-300 hover:bg-gray-900 hover:text-gray-100 rounded-md dark:bg-gray-800 dark:text-white dark:hover:bg-gray-50 dark:hover:text-gray-900 transition-colors duration-200 ease-out">
            Edit
          </button>
        </Link>
        <button
          className="px-4 py-2.5 text-sm font-bold text-white bg-gray-900 rounded-md dark:text-gray-900 dark:bg-gray-50"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
}

export default PostPreviewPage;
