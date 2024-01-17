import { usersColumns } from "@/components/Admin/DataTable/components/columns/usersColumns";
import { DataTable } from "@/components/Admin/DataTable/components/data-table";
import Section from "@/components/Admin/Section";
import { deleteUserAdmin } from "@/db/mutations/admin/deleteUserAdmin";
import { getAllUsersAdmin } from "@/db/queries/admin/getAllUsersAdmin";

async function AdminUsersPage({
  searchParams: { page, limit, sort, search },
}: SearchParams) {
  const limitNumber = Number(limit);
  const pageNumber = Number(page);

  const sortValues = sort?.split(".");
  const sortBy = sortValues?.[0];
  const orderBy = sortValues?.[1];

  const { users, usersCount } = await getAllUsersAdmin({
    limitNumber: limitNumber || 10,
    pageNumber,
    sortBy: sortBy,
    order: orderBy,
    username: search,
  });

  return (
    <Section title="All Users">
      {users && (
        <DataTable
          columns={usersColumns}
          data={users}
          searchBy="username"
          count={usersCount}
          deleteAction={deleteUserAdmin}
          mannualControl
        />
      )}
    </Section>
  );
}

export default AdminUsersPage;
