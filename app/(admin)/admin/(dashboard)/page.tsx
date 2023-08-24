// import DashBoardCards from "@/components/Admin/Cards";
import { getPostsPerMonth } from "@/db/queries/admin/getPostsPerMonth";
import Counts from "./Counts";
import PostsOverview from "./PostsOverview";
import UsersOverview from "./UsersOverview";
import { getUsersperMonth } from "@/db/queries/admin/getUsersPerMonth";
import ViewsOverview from "./ViewsOverview";
import { getPostsViewsPerMonth } from "@/db/queries/admin/getPostsViewsPerMonth";
import { getAllPosts } from "@/db/queries/getAllPosts";
import Section from "@/components/Admin/Section";
import { DataTable } from "@/components/Admin/DataTable/components/data-table";
import { popularPostsColumn } from "@/components/Admin/DataTable/components/columns/popularPostsColumn";

async function AdminDashboardPage() {
  const { postsPermonth } = await getPostsPerMonth();
  const { usersPerMonth } = await getUsersperMonth();
  const { postsViewsPerMonth } = await getPostsViewsPerMonth();
  const { data: popularPosts } = await getAllPosts({
    limitNumber: 5,
    sort: "popular",
  });

  // console.log("postspermonthcount", postsPermonth);

  return (
    <div className="space-y-6">
      {/* <DashBoardCards /> */}
      <Counts />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <UsersOverview usersData={usersPerMonth} />

        <PostsOverview postsData={postsPermonth} />

        <ViewsOverview viewsData={postsViewsPerMonth} />

        <Section title="Popular Posts">
          {popularPosts && (
            <DataTable
              columns={popularPostsColumn}
              data={popularPosts}
              disablePagination
              disableRowSelect
              disableSearch
            />
          )}
        </Section>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
