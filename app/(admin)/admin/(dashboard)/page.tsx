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
import { getFirstYear } from "@/db/queries/admin/getFirstYear";

type ChartParams = {
  searchParams: {
    users: string;
    posts: string;
    views: string;
  };
};

async function AdminDashboardPage({
  searchParams: { users, posts, views },
}: ChartParams) {
  const currentYear = new Date().getFullYear();

  const usersYear = Number(users) || currentYear;
  const postsYear = Number(posts) || currentYear;
  const viewsYear = Number(views) || currentYear;

  const allPromises = [
    getUsersperMonth({ year: usersYear }),
    getPostsPerMonth({ year: postsYear }),
    getPostsViewsPerMonth({
      year: viewsYear,
    }),
  ];

  const [usersPerMonth, postsPerMonth, postsViewsPerMonth] = await Promise.all(
    allPromises
  );

  const { data: popularPosts } = await getAllPosts({
    limitNumber: 5,
    sort: "popular",
  });

  const firstYear = await getFirstYear();

  return (
    <div className="space-y-6">
      <Counts />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <UsersOverview usersData={usersPerMonth} firstYear={firstYear} />

        <PostsOverview postsData={postsPerMonth} firstYear={firstYear} />

        <ViewsOverview viewsData={postsViewsPerMonth} firstYear={firstYear} />

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
