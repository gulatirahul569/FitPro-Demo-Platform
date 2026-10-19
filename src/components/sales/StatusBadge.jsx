const STYLES = {
  "New Request": "bg-blue-50 text-blue-700",
  Contacting: "bg-yellow-50 text-yellow-700",
  "Availability Check": "bg-purple-50 text-purple-700",
  "Demo Pending": "bg-orange-50 text-orange-700",
  "Pending Payment": "bg-amber-50 text-amber-700",
  "Demo Confirmed": "bg-green-50 text-green-700",
  "Demo Completed": "bg-teal-50 text-teal-700",
  "Converted / Closed": "bg-gray-100 text-gray-600",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
        STYLES[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}