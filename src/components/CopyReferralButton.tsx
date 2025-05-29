"use client";

import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function CopyReferralButton({
  referralCode,
}: {
  referralCode: string;
}) {
  const handleCopyReferral = () => {
    navigator.clipboard
      .writeText(referralCode)
      .then(() => {
        toast.success("Referral code copied!");
      })
      .catch(() => {
        toast.error("Failed to copy referral code");
      });
  };

  return (
    <button
      onClick={handleCopyReferral}
      className="p-1 text-gray-600 hover:text-amber-500 transition-colors cursor-pointer"
      title="Copy referral code"
    >
      <Copy className="w-5 h-5" />
    </button>
  );
}
