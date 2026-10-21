
import DemoRequestForm from "@/components/booking/DemoRequestForm";

export const metadata = {
  title: "Request a Demo",
  description:
    "Request an in-home fitness demo. Our team will contact you to check trainer availability and agree a time.",
};

export default async function BookDemoPage({ searchParams }) {
  const params = await searchParams;

  const pick = (key) =>
    typeof params?.[key] === "string" ? params[key] : "";

  return (
    <main className="min-h-screen bg-[#060b16] px-4 py-10 text-white sm:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <DemoRequestForm
          source={pick("utm_source") || pick("source")}
          medium={pick("utm_medium")}
          campaign={pick("utm_campaign")}
        />
      </div>
    </main>
  );
}
