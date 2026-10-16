import DemoRequestForm from "@/components/booking/DemoRequestForm";

export const metadata = {
  title: "Request a Demo",
  description:
    "Request an in-home fitness demo. Our team will contact you to check trainer availability and agree a time.",
};

export default async function BookDemoPage({ searchParams }) {
  const params = await searchParams;
  const pick = (key) => (typeof params?.[key] === "string" ? params[key] : "");

  return (
    <main className="min-h-screen bg-[#070d17] px-6 pb-20 pt-12 text-white md:pt-32">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-black md:text-4xl">Request Your Demo</h1>
        <p className="mt-2 text-sm text-white/60">
          Fill in a few details. Our team will contact you to check trainer
          availability and agree a demo time.
        </p>

        <DemoRequestForm
          source={pick("utm_source") || pick("source")}
          medium={pick("utm_medium")}
          campaign={pick("utm_campaign")}
        />
      </div>
    </main>
  );
}