export function timeAgo(date: string) {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffSec = Math.max(0, Math.floor(diffMs / 1000));

  const units: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let value = diffSec;
  for (const [amount, unit] of units) {
    if (value < amount) {
      const rounded = Math.floor(value);
      if (unit === "second") return "just now";
      return `${rounded} ${unit}${rounded === 1 ? "" : "s"} ago`;
    }
    value /= amount;
  }
  return "a while ago";
}
