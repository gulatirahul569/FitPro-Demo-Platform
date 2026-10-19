import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  getBookingsByTrainer,
  getUniqueClientsForTrainer,
} from "@/lib/models/booking";
import { getTrainerProfile } from "@/lib/models/trainerProfile";
import {
  getReviewsByTrainer,
  getTrainerRatingSummary,
} from "@/lib/models/review";
import { getDb } from "@/lib/db";
import StarRating from "@/components/ui/StarRating";
import {
  Users,
  Calendar,
  Wallet,
  Star,
  Video,
  Clock,
  ArrowRight,
} from "lucide-react";

export default async function TrainerDashboardPage() {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== "trainer" && session.user.role !== "admin")
  ) {
    redirect("/login");
  }

  const firstName = session.user.name?.split(" ")[0];
  const db = await getDb();

  const [
    allBookings,
    clients,
    profile,
    allReviews,
    ratingSummary,
    demoBookings,
  ] = await Promise.all([
    getBookingsByTrainer(session.user.id),
    getUniqueClientsForTrainer(session.user.id),
    getTrainerProfile(session.user.id),
    getReviewsByTrainer(session.user.id),
    getTrainerRatingSummary(session.user.id),
    db
      .collection("demoBookings")
      .find({ trainerId: session.user.id })
      .sort({ date: 1, time: 1 })
      .limit(5)
      .toArray(),
  ]);

  const recentBookings = allBookings.slice(0, 3).map((b) => ({
    client: b.userName,
    type: b.type === "demo" ? "Free Demo Session" : "Paid Session",
    time: `${b.date}, ${b.time}`,
    status: b.status,
  }));

  const upcomingCount = allBookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed"
  ).length;

  const completedSessions = allBookings.filter(
    (b) => b.status === "completed" && b.type === "session"
  ).length;

  const estimatedEarnings =
    completedSessions * (Number(profile?.price) || 0);

  const stats = [
    {
      label: "Total Clients",
      value: clients.length,
      icon: Users,
      iconColor: "text-blue-600",
      change: `${clients.length} unique client${
        clients.length !== 1 ? "s" : ""
      }`,
    },
    {
      label: "Upcoming Sessions",
      value: upcomingCount,
      icon: Calendar,
      iconColor: "text-purple-600",
      change:
        upcomingCount > 0 ? "Pending or confirmed" : "None scheduled",
    },
    {
      label: "This Month's Earnings",
      value: `₹${estimatedEarnings.toLocaleString("en-IN")}`,
      icon: Wallet,
      iconColor: "text-green-600",
      change: `${completedSessions} completed session${
        completedSessions !== 1 ? "s" : ""
      }`,
    },
    {
      label: "Average Rating",
      value: ratingSummary.averageRating ?? "—",
      icon: Star,
      iconColor: "text-yellow-500",
      change: `${ratingSummary.totalReviews} review${
        ratingSummary.totalReviews !== 1 ? "s" : ""
      }`,
    },
  ];

  const recentReviews = allReviews.slice(0, 3).map((r) => ({
    client: r.userName,
    rating: r.rating,
    comment: r.comment,
  }));

  const quickActions = [
    {
      label: "Upload Video",
      href: "/trainer/videos",
      icon: Video,
      iconColor: "text-red-500",
    },
    {
      label: "View Schedule",
      href: "/trainer/schedule",
      icon: Clock,
      iconColor: "text-blue-500",
    },
    {
      label: "Manage Clients",
      href: "/trainer/clients",
      icon: Users,
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div>
      {/* Profile summary */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
            {firstName?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-black">
              Welcome back, {firstName}
            </h1>

            <p className="text-sm text-gray-500">
              Here&apos;s what&apos;s happening with your training business.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:border-black"
              >
                <Icon size={16} className={action.iconColor} />
                <span className="hidden sm:inline">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <Icon size={20} className={stat.iconColor} />
                </div>
              </div>

              <p className="text-2xl font-bold text-black">{stat.value}</p>

              <p className="mb-1 text-sm text-gray-500">{stat.label}</p>

              <p className="text-xs text-gray-400">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent bookings */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black">
              Recent Bookings
            </h2>

            <Link
              href="/trainer/bookings"
              className="flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-black"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              No bookings yet.
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-gray-100">
              {recentBookings.map((booking, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-black">
                      {booking.client}
                    </p>

                    <p className="text-xs text-gray-500">{booking.type}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-700">{booking.time}</p>

                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        booking.status === "confirmed" ||
                        booking.status === "completed"
                          ? "bg-green-50 text-green-700"
                          : booking.status === "cancelled"
                          ? "bg-gray-100 text-gray-500"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent reviews */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black">
              Recent Reviews
            </h2>

            <Link
              href="/trainer/reviews"
              className="flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-black"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {recentReviews.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              No reviews yet.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {recentReviews.map((review, i) => (
                <div
                  key={i}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium text-black">
                      {review.client}
                    </p>

                    <StarRating rating={review.rating} size={12} />
                  </div>

                  <p className="text-xs leading-relaxed text-gray-500">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Demo requests */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">
            Demo Requests
          </h2>

          <Link
            href="/trainer/demo-bookings"
            className="flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-black"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {demoBookings.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">
            No demo requests yet.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-gray-100">
            {demoBookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-black">
                    {booking.customerName}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500">
                    {booking.date} · {booking.time}
                  </p>

                  {booking.address && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">
                      {booking.address}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-green-50 text-green-700"
                        : booking.status === "Completed"
                        ? "bg-teal-50 text-teal-700"
                        : booking.status === "Cancelled" ||
                          booking.status === "No Show"
                        ? "bg-gray-100 text-gray-500"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>

                  <Link
                    href={`/trainer/demo-bookings`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:border-black"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}