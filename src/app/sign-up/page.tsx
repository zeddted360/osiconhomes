import MemberForm from "@/components/MemberForm";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white px-4 py-10">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-600">
            Become a Valued Member
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Join our membership program and enjoy up to{" "}
            <span className="text-amber-500 font-semibold">15% profit</span> on
            every property sale you refer. Let’s grow together!
          </p>
        </div>

        <MemberForm />

        <p className="text-sm text-center text-gray-500 mt-4">
          Already a member?{" "}
          <Link
            href="/login"
            className="text-amber-600 hover:underline font-medium"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
