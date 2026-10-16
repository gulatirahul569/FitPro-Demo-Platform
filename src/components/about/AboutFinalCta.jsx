    import Link from "next/link";
    import { ArrowRight, Package } from "lucide-react";
    import Reveal from "@/components/ui/Reveal";
    import { BRAND } from "@/lib/brand";
    import PackageImage from "@/components/packages/PackageImage";


    export default function AboutFinalCta() {
    return (
        <section className="bg-[#070d17] px-6 py-16 sm:py-8 md:px-8 lg:px-12">
        <div className="mx-auto max-w-full">
            <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-12 text-center sm:px-10 sm:py-16">
                {/* Background image */}
                <PackageImage
                src="https://images.pexels.com/photos/5810663/pexels-photo-5810663.jpeg"
                alt="Trainer conducting an in-home fitness demo"
                width={1600}
                className="absolute inset-0 h-full w-full object-cover object-center"
                />


                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d17] via-[#070d17]/75 to-[#070d17]/30"/>


                {/* CTA content */}
                <div className="relative">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/50 sm:text-xs">
                    Get Started
                </p>


                <h2 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
                    Ready to experience a
                    <br />
                    <span className="text-white/40">fitness demo at home?</span>
                </h2>


                <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                    Request a demo and our team will contact you to check trainer
                    availability and agree on a suitable time.
                </p>


                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                    href="/book-demo"
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl active:scale-[0.98] sm:w-auto"
                    >
                    Book a Demo
                    <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                    </Link>


                    <Link
                    href="/packages"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 active:scale-[0.98] sm:w-auto"
                    >
                    <Package size={18} />
                    View Packages
                    </Link>
                </div>


                <p className="mt-6 text-xs text-white/60 sm:text-sm">
                    Submitting a request does not confirm a demo. Our team will
                    contact you to coordinate the next steps.
                </p>
                </div>
            </div>
            </Reveal>
        </div>
        </section>
    );
    }