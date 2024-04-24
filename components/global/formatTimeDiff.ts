export default function formatTimestampAgo(minutesAgo: number) {
  if (minutesAgo < 60) {
    return `${minutesAgo}m`;
  } else if (minutesAgo < 1440) {
    return `${Math.floor(minutesAgo / 60)}h`;
  } else if (minutesAgo < 10080) {
    return `${Math.floor(minutesAgo / 1440)}d`;
  } else if (minutesAgo < 43800) {
    return `${Math.floor(minutesAgo / 10080)}w`;
  } else {
    return `${Math.floor(minutesAgo / 43800)}y`;
  }
}

export function formatTimestampDiff(dateString: string) {
  const date = new Date(dateString);

  const minutesAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60));

  if (minutesAgo < 60) {
    return `${minutesAgo}m`;
  } else if (minutesAgo < 1440) {
    return `${Math.floor(minutesAgo / 60)}h`;
  } else if (minutesAgo < 10080) {
    return `${Math.floor(minutesAgo / 1440)}d`;
  } else if (minutesAgo < 43800) {
    return `${Math.floor(minutesAgo / 10080)}w`;
  } else {
    return `${Math.floor(minutesAgo / 43800)}y`;
  }
}
