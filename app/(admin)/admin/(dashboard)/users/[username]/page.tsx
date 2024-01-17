import { userPostsColumn } from "@/components/Admin/DataTable/components/columns/userPostsColumn";
import { DataTable } from "@/components/Admin/DataTable/components/data-table";
import Section from "@/components/Admin/Section";
import { getAllPostsAdmin } from "@/db/queries/admin/getAllPostsAdmin";
import { getSingleUserAdmin } from "@/db/queries/admin/getSingleUserAdmin";
import React from "react";
import UserDetails from "./UserDetails";
import { notFound } from "next/navigation";
import UserCounts from "./UserCounts";
import UserBio from "./UserBio";
import UserOption from "./UserOption";
import { deletePostAdmin } from "@/db/mutations/admin/deletePostAdmin";

type UserPageProps = SearchParams & {
  params: { username: string };
};

async function AdminSingleUserPage({
  params: { username },
  searchParams: { page, limit, sort, search },
}: UserPageProps) {
  const usernameDecoded = decodeURIComponent(username);

  const { data: user } = await getSingleUserAdmin({
    username: usernameDecoded,
  });

  if (!user) {
    notFound();
  }

  console.log("user", user);

  const limitNumber = Number(limit);
  const pageNumber = Number(page);
  // const { data, count } = await getAllPosts({
  //   limitNumber: limitNumber || 10,
  //   pageNumber,
  // });

  const sortValues = sort?.split(".");
  const sortBy = sortValues?.[0];
  const orderBy = sortValues?.[1];

  const { data: posts, count } = await getAllPostsAdmin({
    limitNumber: limitNumber || 10,
    pageNumber,
    sortBy: sortBy,
    order: orderBy,
    title: search,
    username: usernameDecoded,
  });

  const totalViews = user.posts
    .map((post) => post._count.views)
    .reduce((acc, views) => acc + (views ?? 0), 0);

  return (
    <div className="relative">
      <div className="absolute -top-7 lg:-top-14 right-0">
        <UserOption id={user.id} username={user.username} />
      </div>
      <div className="pt-8 lg:pt-0 space-y-7">
        <div className="flex flex-col lg:flex-row justify-between gap-7">
          <UserDetails username={user.username} />

          <div className="flex-1 space-y-7 flex flex-col">
            <UserBio bio={user.profile?.bio} />
            <UserCounts
              postsCount={user._count.posts}
              viewsCount={totalViews}
            />
          </div>
        </div>
        <Section title={`All Posts from ${usernameDecoded}`}>
          {posts && (
            <DataTable
              columns={userPostsColumn}
              data={posts}
              count={count}
              searchBy="title"
              deleteAction={deletePostAdmin}
              mannualControl
            />
          )}
        </Section>
      </div>
    </div>
  );
}

export default AdminSingleUserPage;
