import { postsColumns } from "@/components/Admin/DataTable/components/columns/postsColumns";
import { DataTable } from "@/components/Admin/DataTable/components/data-table";
import Section from "@/components/Admin/Section";
import { deletePostAdmin } from "@/db/mutations/admin/deletePostAdmin";
import { getAllPostsAdmin } from "@/db/queries/admin/getAllPostsAdmin";

async function AdminPostsPage({
  searchParams: { page, limit, sort, search },
}: SearchParams) {
  const limitNumber = Number(limit);
  const pageNumber = Number(page);

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
          deleteAction={deletePostAdmin}
          mannualControl
        />
      )}
    </Section>
  );
}

export default AdminPostsPage;
