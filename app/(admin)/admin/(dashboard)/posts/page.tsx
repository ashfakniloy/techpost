import { postsColumns } from "@/components/Admin/DataTable/components/columns/postsColumns";
import { usersColumns } from "@/components/Admin/DataTable/components/columns/usersColumns";
import { DataTable } from "@/components/Admin/DataTable/components/data-table";
import Section from "@/components/Admin/Section";
// import { taskSchema } from "@/components/Admin/DataTable/data/schema";
import { getAllPostsAdmin } from "@/db/queries/admin/getAllPostsAdmin";
import { getAllPosts } from "@/db/queries/getAllPosts";
import { getUsers } from "@/db/queries/getUsers";

import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

async function AdminPostsPage({
  searchParams: { page, limit, sort, search },
}: SearchParams) {
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
  });
  // console.log("posts", data);

  return (
    <Section title="All Posts">
      {posts && (
        <DataTable
          columns={postsColumns}
          data={posts}
          count={count}
          searchBy="title"
          deleteUrl={`/api/admin/post`}
          mannualControl
        />
      )}
    </Section>
  );
}

export default AdminPostsPage;
