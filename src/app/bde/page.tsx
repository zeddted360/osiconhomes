import { Eye, Mail, User, CheckCircle, XCircle, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { connectDb } from "@/utils/connectDb";
import { Bde } from "@/models/bde";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";
import CopyReferralButton from "@/components/CopyReferralButton";
import { Metadata } from "next";
import VerifyButton from "@/components/VerifyButton";

export const metadata:Metadata = {
  title: "Our BDEs | Real Estate",
  description:
    "Meet our team of Business Development Executives ready to help you find your dream property.",
};

export interface Bde {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  referralCode?: string;
  isVerified: boolean;
}

async function fetchBdes(): Promise<Bde[]> {
  try {
    await connectDb();
    const bdes = await Bde.find({})
      .select("firstname lastname username email referralCode isVerified")
      .lean();
    return bdes as  unknown as Bde[];
  } catch (error) {
    console.error("Error fetching BDEs:", error);
    return [];
  }
}

export default async function BdePage() {
  const bdes = await fetchBdes();

  if (!bdes || bdes.length === 0) {
    notFound();
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Toaster position="top-right" />

      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        <Image
          src="/Real_estate_Hero.jpg"
          alt="BDE Background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-20"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 px-6 py-16 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full mx-auto mb-6"></div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                Meet Our Team
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with our dedicated Business Development Executives who are
              ready to help you achieve your goals
            </p>
            <div className="mt-8 flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">
                  {bdes.filter((b) => b.isVerified).length} Active
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{bdes.length} Total Executives</span>
              </div>
            </div>
          </div>

          {/* Enhanced Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {bdes.map((bde, index) => (
              <div
                key={bde._id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur"></div>

                {/* Main Card */}
                <div className="relative bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl transition-all duration-500 group-hover:shadow-amber-500/20 group-hover:transform group-hover:scale-[1.02] group-hover:-translate-y-2">
                  {/* Status Badge */}
                  <div className="absolute top-6 right-6">
                    {bde.isVerified ? (
                      <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                        <XCircle className="w-3 h-3" />
                        <span>Pending</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center text-center">
                    {/* Enhanced Avatar */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        {bde.firstname.charAt(0)}
                        {bde.lastname.charAt(0)}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Name and Username */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {bde.firstname} {bde.lastname}
                      </h3>
                      <p className="text-gray-500 font-medium">
                        @{bde.username}
                      </p>
                    </div>

                    {/* Contact Info */}
                    <div className="w-full space-y-3 mb-6">
                      <div className="flex items-center justify-center space-x-3 text-gray-600 bg-gray-50 rounded-xl p-3">
                        <Mail className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium truncate">
                          {bde.email}
                        </span>
                      </div>

                      {bde.isVerified && bde.referralCode && (
                        <div className="flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-200">
                          <div className="flex items-center space-x-2">
                            <Copy className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-gray-700">
                              {bde.referralCode}
                            </span>
                          </div>
                          <CopyReferralButton referralCode={bde.referralCode} />
                        </div>
                      )}
                    </div>

                    {/* Enhanced CTA Button */}
                    <Link
                      href={`/bde/${bde._id}`}
                      className="group/btn relative w-full px-6 py-4 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center space-x-3">
                        <Eye className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                        <span>View Full Profile</span>
                      </div>
                            </Link>
                            
                            {/* Verify button */}
                            {
                             !bde.isVerified  && <VerifyButton _id={JSON.stringify(bde._id)} />
                            }
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Stats Section */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center space-x-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  {bdes.length}
                </div>
                <div className="text-sm text-gray-400">Total Executives</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  {bdes.filter((b) => b.isVerified).length}
                </div>
                <div className="text-sm text-gray-400">Verified</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  {bdes.filter((b) => b.referralCode).length}
                </div>
                <div className="text-sm text-gray-400">With Referrals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}