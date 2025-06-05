"use client";
import Link from "next/link";
import { useState } from "react";

type VerifyFailureClientProps = {
  id: string | null;
};

export default function VerifyFailureClient({ id }: VerifyFailureClientProps) {
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  const handleResendVerification = async () => {
    setResendMessage("");
    setResendError("");
    try {
      if (!id) {
        throw new Error("User ID is missing.");
      }

      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }

      setResendMessage(
        "A new verification email has been sent. Please check your inbox."
      );
    } catch (error) {
      setResendError(
        error instanceof Error
          ? error.message
          : "Failed to resend verification email. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Verification Failed
        </h2>
        <p className="text-gray-500">
          The verification link is invalid or has expired. Please request a new
          verification link.
        </p>

        {resendMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">
            {resendMessage}
          </div>
        )}
        {resendError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
            {resendError}
          </div>
        )}

        <button
          onClick={handleResendVerification}
          className="w-full p-3 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold hover:from-amber-500 hover:to-orange-600 transition duration-200"
        >
          Resend Verification Email
        </button>

        <p className="text-sm text-gray-500">
          Already verified?{" "}
          <Link
            href="/log-in"
            className="text-amber-600 hover:underline font-medium"
          >
            Sign in here
          </Link>
        </p>
        <p className="text-sm text-gray-500">
          Go back to{" "}
          <Link href="/" className="text-amber-600 hover:underline font-medium">
            Homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
