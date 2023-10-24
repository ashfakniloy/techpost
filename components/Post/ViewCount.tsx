// "use client";

// import { useEffect } from "react";
// import Cookies from "js-cookie";
// import { revalidateTagAction } from "@/actions/revalidateTagAction";

// function ViewCount({ postId, isAdmin }: { postId: string; isAdmin: boolean }) {
//   useEffect(() => {
//     if (isAdmin) return;

//     const deviceId = Cookies.get("deviceId");

//     const countView = async () => {
//       const url = `/api/post/view?postId=${postId}&deviceId=${deviceId}`;
//       const response = await fetch(url, {
//         method: "POST",
//       });

//       const data = await response.json();

//       if (response.ok) {
//         if (data.viewAdded) {
//           revalidateTagAction("counts");
//         }
//       } else {
//         console.log("view error", data);
//       }
//     };

//     deviceId && countView();
//   }, [postId]);

//   return <></>;
// }

// export default ViewCount;
