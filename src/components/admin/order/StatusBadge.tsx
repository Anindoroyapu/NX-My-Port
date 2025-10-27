const statusColors = {
  Shipped: "bg-blue-100 text-blue-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Delivered: "bg-green-100 text-green-800",
  Pending: "bg-orange-100 text-orange-800",
  Cancelled: "bg-red-100 text-red-800",
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-slate-100 text-slate-800",
} as const;

const StatusBadge = ({
  status,
}: {
  status: keyof typeof statusColors | string;
}) => {
  return (
    <span
      className={`py-1 px-2.5 rounded-full text-xs font-medium whitespace-nowrap ${
        statusColors[status as keyof typeof statusColors] ||
        "bg-slate-100 text-slate-800"
      }`}
    >
      {status}
    </span>
  );
};
export default StatusBadge;
