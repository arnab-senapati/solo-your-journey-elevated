import { useEffect, useState } from "react";

function diff(target: number) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return { days, hours };
}

export function CountdownBadge({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const [{ days, hours }, setD] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setD(diff(target)), 60_000);
    return () => clearInterval(id);
  }, [target]);

  if (days === 0 && hours === 0) return <span>Departing today</span>;
  return (
    <span>
      Departs in {days}d {hours}h
    </span>
  );
}
