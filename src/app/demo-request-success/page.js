import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = { title: "Request Received" };

const steps = [
  "We review your details and look for a trainer available in your area at your preferred times, in the order you chose them.",
  "Our sales team contacts you within 24 hours to confirm your demo at your priority time.",
  "If the trainer suggests a different time, we email you and get in touch with you.",
  "If you agree to the new time, the same trainer will visit you. If not, we will assign another trainer.",
];

export default async function DemoRequestSuccessPage({ searchParams }) {
  const params = await searchParams;
  const id = typeof params?.id === "string" ? params.id : "";

  return (
    <main className="min-h-screen bg-[#070d17] px-6 pb-20 pt-12 text-white md:pt-32">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
          <CheckCircle2 size={32} />
        </div>

        <h1 className="mt-6 text-3xl font-black">Request Submitted!</h1>
        <p className="mt-2 text-sm text-white/60">
          Your payment is safe with us and your demo request has been
          received. Our sales team will contact you within 24 hours.
        </p>
        {id && (
          <p className="mt-3 text-xs text-white/50">
            Reference: <span className="font-semibold text-white">{id}</span>
          </p>
        )}

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f1a2b] p-6 text-left shadow-xl shadow-black/30">
          <h2 className="font-bold text-white">What happens next?</h2>
          <ol className="mt-4 space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-white/70">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-white/10 pt-4 text-xs text-white/50">
            Your demo is confirmed once a trainer is assigned and the time is
            agreed with you.
          </p>
        </div>

        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-colors hover:bg-gray-100"
        >
          Back to Home
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </main>
  );
}