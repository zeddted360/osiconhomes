// components/Affiliate.tsx
import Image from "next/image";
import Link from "next/link";

export default function Affiliate() {
  return (
    <section className="relative w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-16 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-3 pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        {/* Text Section */}
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400/30 to-orange-500/30 border border-amber-400/40">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-800 font-semibold text-sm uppercase tracking-wider">
              Affiliate Program
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Earn Up to <span className="text-amber-500">20%</span> Commission on
            Every Sale
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Join our affiliate program and start earning extra income today.
            Looking for a way to boost your earnings? This is it!
          </p>
          <Link href="/bde-join">
            <button className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:from-amber-500 hover:to-orange-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50">
              Become an Affiliate
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <div className="relative rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 border border-gray-100 hover:border-amber-300">
            <Image
              src="/istockphoto-1362265077-170667a.webp"
              alt="Affiliate discussion"
              width={500}
              height={400}
              className="object-cover"
              quality={85}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
