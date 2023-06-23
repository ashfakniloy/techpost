import { format } from "date-fns";

export const getFormatedDate = (date: Date) => {
  const formatedDate = format(new Date(date), "MMMM dd yyyy, p");

  return formatedDate;
};
