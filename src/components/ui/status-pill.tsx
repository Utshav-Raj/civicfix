import { STATUS_META } from "@/lib/categories";
import { Status } from "@/lib/types";
import { Badge } from "./badge";

export function StatusPill({ status }: { status: Status }) {
  const meta = STATUS_META[status] ?? STATUS_META.submitted;
  return (
    <Badge color={meta.color} bg={meta.bg}>
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: meta.color, boxShadow: `0 0 8px ${meta.color}` }}
      />
      {meta.label}
    </Badge>
  );
}
