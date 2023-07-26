"use client";

import { formatDistanceToNow } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const ClientTimeDistance = ({ date }: { date: Date }) => {
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const clientDate = utcToZonedTime(date, clientTimezone);

  // console.log("timezone", clientTimezone);

  const formattedDate = formatDistanceToNow(new Date(clientDate), {
    addSuffix: true,
  });

  return <>{clientTimezone ? formattedDate : ""}</>;
};
