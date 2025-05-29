import { connectDb } from "@/utils/connectDb";
import { Bde } from "@/models/bde";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  User,
  CheckCircle,
  XCircle,
  Copy,
  MapPin,
  Phone,
  Globe,
  Award,
  TrendingUp,
} from "lucide-react";
import ShareButton from "@/components/ShareButton";

export interface Bde {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
    email: string;
    phone: string;
  referralCode?: string;
  isVerified: boolean;
}

export default async function BdeProfile({
  params,
}: {
  params: { id: string };
}) {
  await connectDb();
  const bde = await Bde.findById(await params.id)
    .select("firstname lastname username email phone referralCode isVerified")
    .lean();

  if (!bde) {
    notFound();
  }

  const typedBde = bde as unknown as Bde;

 
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <Image
          src="/Real_estate_Hero.jpg"
          alt="Profile Background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-15"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 px-6 py-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/bde"
              className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-medium">Back to Team</span>
            </Link>
                      { /* Share Button */}
                      <ShareButton typedBde={JSON.stringify(typedBde)} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Avatar Section */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                        {typedBde.firstname.charAt(0)}
                        {typedBde.lastname.charAt(0)}
                      </div>
                      {/* Status Indicator */}
                      <div className="absolute -bottom-2 -right-2">
                        {typedBde.isVerified ? (
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                            <XCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-4">
                      <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        {typedBde.firstname} {typedBde.lastname}
                      </h1>
                      <p className="text-xl text-gray-600 font-medium mb-4">
                        @{typedBde.username}
                      </p>

                      {/* Status Badge */}
                      <div className="inline-flex items-center space-x-2">
                        {typedBde.isVerified ? (
                          <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                            <CheckCircle className="w-4 h-4" />
                            <span>Verified Executive</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium">
                            <XCircle className="w-4 h-4" />
                            <span>Pending Verification</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bio Section */}
                    <div className="mb-6">
                      <p className="text-gray-600 leading-relaxed">
                        Dedicated Business Development Executive committed to
                        helping clients achieve their real estate goals. With
                        extensive market knowledge and personalized service
                        approach.
                      </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`mailto:${typedBde.email}`}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Send Email</span>
                      </Link>
                      <Link
                        href={`tel:${typedBde.phone}`}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <User className="w-5 h-5 text-amber-500" />
                  <span>Contact Details</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-amber-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800 truncate">
                        {typedBde.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Globe className="w-5 h-5 text-amber-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium text-gray-800">
                        @{typedBde.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-800">
                        Abuja, Nigeria
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Referral Code */}
              {typedBde.isVerified && typedBde.referralCode && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <Award className="w-5 h-5 text-orange-500" />
                    <span>Referral Code</span>
                  </h3>
                  <div className="bg-white rounded-xl p-4 border border-amber-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Share this code
                        </p>
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                          {typedBde.referralCode}
                        </p>
                      </div>
                      <button className="p-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-300">
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Share this referral code with your network to earn rewards
                  </p>
                </div>
              )}

              {/* Performance Stats */}
              <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  <span>Performance</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Deals Closed</span>
                    <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                      12
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Client Rating</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                        4.9
                      </span>
                      <span className="text-gray-400">★</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                      2h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-12 bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h4 className="text-xl font-bold text-gray-800">
                  Ready to Get Started?
                </h4>
                <p className="text-gray-600">
                  Connect with {typedBde.firstname} to discuss your real estate
                  needs
                </p>
              </div>
              <div className="flex space-x-4">
                <Link
                  href={`mailto:${typedBde.email}`}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  Start Conversation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
