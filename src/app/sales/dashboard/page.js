import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  UserPlus,
  BellRing,
  Clock,
  CalendarCheck,
} from "lucide-react";
import { requireSales } from "@/lib/salesAuth";
import { getLeadStats, listLeads } from "@/lib/models/lead";
import StatusBadge from "@/components/sales/StatusBadge";
import { fmtDate } from "@/components/sales/format";
import { getDemoBookingStats } from "@/lib/models/demoBooking";

export const metadata = { title: "Sales Dashboard" };

export default async function SalesDashboardPage() {
  const user = await requireSales();
  if (!user) redirect("/login");

  const [stats, demoStats, recent] = await Promise.all([
    getLeadStats(),
    getDemoBookingStats(),
    listLeads({ limit: 8 }),
  ]);

  const cards = [
    {
      label: "New Leads",
      value: stats.newLeads,
      icon: UserPlus,
      color: "text-blue-600",
      href: "/sales/leads?status=New Request",
    },
    {
      label: "Follow-ups Due",
      value: stats.followUpsDue,
      icon: BellRing,
      color: "text-red-500",
      href: "/sales/leads?status=due",
    },
    {
      label: "Today’s Demos",
      value: demoStats.todaysDemos,
      icon: CalendarCheck,
      color: "text-orange-500",
      href: "/sales/demo-bookings?date=today",
    },
    {
      label: "Confirmed Demos",
      value: demoStats.confirmed,
      icon: CalendarCheck,
      color: "text-green-600",
      href: "/sales/demo-bookings?status=Confirmed",
    },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-black">
        Welcome, {user.name?.split(" ")[0]}
      </h1>
      <p className="mb-8 text-gray-500">
        {stats.total} lead{stats.total === 1 ? "" : "s"} in total.
      </p>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-lg"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <Icon size={20} className={card.color} />
              </div>
              <div>
                <p className="text-xl font-bold text-black">{card.value}</p>
                <p className="mt-0.5 text-xs text-gray-500">{card.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">Recent Leads</h2>
          <Link
            href="/sales/leads"
            className="flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-black"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-400">
            No leads yet.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-gray-100">
            {recent.map((lead) => (
              <Link
                key={lead.leadId}
                href={`/sales/leads/${lead.leadId}`}
                className="flex items-center justify-between gap-3 py-3 transition-colors hover:bg-gray-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-black">
                    {lead.name}
                    {lead.isDuplicate && (
                      <span className="ml-2 text-[10px] font-semibold text-orange-600">
                        DUPLICATE
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {lead.leadId} · {fmtDate(lead.createdAt)}
                  </p>
                </div>
                <StatusBadge status={lead.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
