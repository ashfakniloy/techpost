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
  const currentYear = new Date().getFullYear();

  const allPromises = [
    getUsersperMonth({ year: currentYear }),
    getPostsPerMonth({ year: currentYear }),
    getPostsViewsPerMonth({
      year: currentYear,
    }),
  ];

  const [usersPerMonth, postsPerMonth, postsViewsPerMonth] = await Promise.all(
    allPromises
  );

  // const { usersPerMonth } = await getUsersperMonth({ year: currentYear });
  // const { postsPerMonth } = await getPostsPerMonth({ year: currentYear });
  // const { postsViewsPerMonth } = await getPostsViewsPerMonth({
  //   year: currentYear,
  // });

  const { data: popularPosts } = await getAllPosts({
    limitNumber: 5,
    sort: "popular",
  });

  // const [usersPerMonth, postsPermonth, postsViewsPerMonth] = result;

  // console.log("result", usersPerMonth);

  // console.log("postspermonthcount", postsPermonth);

  return (
    <div className="space-y-6">
      {/* <DashBoardCards /> */}
      <Counts />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <UsersOverview usersData={usersPerMonth} />

        <PostsOverview postsData={postsPerMonth} />

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
