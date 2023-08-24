import { likesColumns } from "@/components/Admin/DataTable/components/columns/likesColumn";
import { DataTable } from "@/components/Admin/DataTable/components/data-table";
import Section from "@/components/Admin/Section";
import { Like } from "@/types";
// import type { PostAdminTypes } from "@/db/queries/admin/getSinglePostAdmin";

// type Likes = PostAdminTypes["likes"]

function PostLikes({ likes }: { likes: Like[] }) {
  // console.log("likes", likes);

  return (
    <Section title="Post Likes" className="min-h-[240px] space-y-5">
      {likes.length ? (
        <DataTable
          columns={likesColumns}
          data={likes}
          searchBy="username"
          disableRowSelect
          disableSearch
        />
      ) : (
        <p className="pt-10 text-center text-xl text-red-600">No likes found</p>
      )}
    </Section>
  );
}

export default PostLikes;
