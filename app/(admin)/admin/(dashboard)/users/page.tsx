import { usersColumns } from "@/components/Admin/DataTable/components/columns/usersColumns";
import { DataTable } from "@/components/Admin/DataTable/components/data-table";
import Section from "@/components/Admin/Section";
import { getAllUsersAdmin } from "@/prisma/find/admin/getAllUsersAdmin";

async function AdminUsersPage({
  searchParams: { page, limit, sort, search },
}: SearchParams) {
  const limitNumber = Number(limit);
  const pageNumber = Number(page);

  const sortValues = sort?.split("%20").join("").split(".");
  const sortBy = sortValues?.[0];
  const orderBy = sortValues?.[1];

  const { users, usersCount } = await getAllUsersAdmin({
    limitNumber: limitNumber || 10,
    pageNumber,
    sortBy: sortBy,
    order: orderBy,
    username: search,
  });

  // const data = postSchema.array().parse(users);

  // console.log("users", users);

  return (
    <Section title="All Users">
      <DataTable
        columns={usersColumns}
        data={users}
        searchBy="username"
        count={usersCount}
        deleteUrl={`/api/admin/user`}
        mannualControl
      />
    </Section>
  );
}

export default AdminUsersPage;
