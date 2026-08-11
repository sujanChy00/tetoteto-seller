export const truncateString = (
  str: string | undefined,
  num: number,
): string => {
  if (!str) return "";
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
