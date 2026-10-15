import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = { title: "Request Received" };

const steps = [
  "We review your details and check trainer availability in your area.",
  "Our sales team contacts you to confirm a time slot.",
  "Once agreed, you receive a payment link for the demo booking fee.",
  "After payment, your demo is confirmed and your trainer is assigned.",
];

export default async function DemoRequestSuccessPage({ searchParams }) {
  const params = await searchParams;
  const id = typeof params?.id === "string" ? params.id : "";

  return (
    <main className="bg-gray-50 px-6 pb-20 pt-12 md:pt-32">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
          <CheckCircle2 size={32} />
        </div>

        <h1 className="mt-6 text-3xl font-black text-black">Request Submitted!</h1>
        <p className="mt-2 text-sm text-black/60">
          Your request has been received. Our team will contact you shortly.
        </p>
        {id && (
          <p className="mt-3 text-xs text-black/50">
            Reference: <span className="font-semibold text-black">{id}</span>
          </p>
        )}

        <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 text-left shadow-sm">
          <h2 className="font-bold text-black">What happens next?</h2>
          <ol className="mt-4 space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-black/70">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-black/10 pt-4 text-xs text-black/50">
            Your request is not a confirmed booking until a trainer and time are
            agreed with you.
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white hover:bg-gray-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}