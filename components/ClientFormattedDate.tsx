"use client";

import { format } from "date-fns-tz";
// import { format } from "date-fns";

export const ClientFormattedDate = ({ date }: { date: Date }) => {
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // console.log("timezone", clientTimezone);

  const formattedDate = format(new Date(date), "MMMM dd yyyy, p", {
    timeZone: clientTimezone,
  });

  return <>{formattedDate}</>;
};
