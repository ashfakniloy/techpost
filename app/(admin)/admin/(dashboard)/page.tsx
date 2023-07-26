// import DashBoardCards from "@/components/Admin/Cards";
import Counts from "./Counts";
// import { getViewCountPerDay } from "@/prisma/find/getViewCountPerDay";

function AdminDashboardPage() {
  // const { postsViewPerDate } = await getViewCountPerDay();

  // console.log("perdate", postsViewPerDate);

  return (
    <div className="">
      {/* <DashBoardCards /> */}
      <Counts />
    </div>
  );
}

export default AdminDashboardPage;
