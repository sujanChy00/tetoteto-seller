export function formatChatDate(date?: string | number): string {
  if (!date) return "";
  const timestamp = typeof date === "string" ? parseInt(date) : date;
  const now = Date.now();
  const diff = Math.abs(now - timestamp);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return years === 1 ? "a year ago" : `${years} years ago`;
  if (months > 0) return months === 1 ? "a month ago" : `${months} months ago`;
  if (weeks > 0) return weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
  if (days > 0) return days === 1 ? "a day ago" : `${days} days ago`;
  if (hours > 0) return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  if (minutes > 0)
    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  if (seconds > 10) return `${seconds} seconds ago`;
  return "just now";
}
