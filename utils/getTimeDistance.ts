import { formatDistanceToNow } from "date-fns";

export const getTimeDistance = (date: Date) => {
  const formatedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });

  return formatedDate;
};
