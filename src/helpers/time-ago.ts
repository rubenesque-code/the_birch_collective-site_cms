import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
TimeAgo.addDefaultLocale(en);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const gbTimeAgo = new TimeAgo("en-GB");

export function timeAgo(date: Date) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  return gbTimeAgo.format(date);
}
