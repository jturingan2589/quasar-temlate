import { toZonedTime, format } from "date-fns-tz";
import { endOfDay, parseISO } from "date-fns";

export const isoDateString = (
  date: any,
  type?: string,
  timeZone: string = "Asia/Manila",
) => {
  date = type === "end_date" ? endOfDay(parseISO(date)) : date;
  const zoned = toZonedTime(new Date(date), timeZone);
  return zoned;
};

export const formatValue = (type: any, value: any) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  switch (type) {
    case "percent":
      return value + "%";
    case "currency":
      if (typeof value === "string") {
        const withoutCommas = value?.replace(/,/g, ""); // Remove commas
        value = parseFloat(withoutCommas); // Convert to float
      }
      return (
        "₱" +
        Number(value).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    case "datetime":
      return format(value, "MMM dd, yyyy hh:mm:ss a");
    case "time":
      return format(value, "hh:mm:ss a");
    case "date":
      return format(isoDateString(value), "MMM dd yyyy");
    default:
      return value;
  }
};

export const toTitleCase = (phrase: any) => {
  if (!phrase) return;

  return phrase
    .replace(/[_-]/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word: string) =>
      word.charAt(0) === "("
        ? word.charAt(0) + word.charAt(1).toUpperCase() + word.slice(2)
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
};
