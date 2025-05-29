import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Copy, Check } from "lucide-react";

const SuccessMessage = () => {
  const [copiedField, setCopiedField] = useState<
    "accountNumber" | "accountName" | null
  >(null);

  // Handle copy to clipboard
  const handleCopy = (text: string, field: "accountNumber" | "accountName") => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000); // Reset after 2 seconds
  };

  // Animation variants for the success message container
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Animation variants for individual payment detail items
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  // Animation variants for the copy feedback
  const feedbackVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg max-w-md mx-auto"
    >
      <motion.h3
        className="text-3xl font-bold text-amber-800 mb-4 flex items-center justify-center gap-2"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        Welcome to Osicon Homes! 🎉
      </motion.h3>
      <p className="text-gray-700 mb-6 text-lg">
        Your account is ready! To get verified, please send your payment to the
        account below. We’ll confirm your verification soon!
      </p>
      <div className="mb-6 space-y-4">
        <motion.div
          custom={0}
          variants={itemVariants}
          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
        >
          <div className="text-left">
            <p className="text-sm font-medium text-gray-600">Account Number</p>
            <p className="text-base font-semibold text-gray-800">1026678233</p>
          </div>
          <button
            onClick={() => handleCopy("1026678233", "accountNumber")}
            className="p-2 rounded-full hover:bg-amber-200 transition-colors"
            aria-label="Copy account number"
          >
            {copiedField === "accountNumber" ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-amber-600" />
            )}
          </button>
          <AnimatePresence>
            {copiedField === "accountNumber" && (
              <motion.span
                variants={feedbackVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-12 text-xs text-green-500 font-medium"
              >
                Copied!
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          custom={1}
          variants={itemVariants}
          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
        >
          <div className="text-left">
            <p className="text-sm font-medium text-gray-600">Account Name</p>
            <p className="text-base font-semibold text-gray-800">
              Osicon Homes and Development Company
            </p>
          </div>
          <button
            onClick={() =>
              handleCopy("Osicon Homes and Development Company", "accountName")
            }
            className="p-2 rounded-full hover:bg-amber-200 transition-colors"
            aria-label="Copy account name"
          >
            {copiedField === "accountName" ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-amber-600" />
            )}
          </button>
          <AnimatePresence>
            {copiedField === "accountName" && (
              <motion.span
                variants={feedbackVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-12 text-xs text-green-500 font-medium"
              >
                Copied!
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          custom={2}
          variants={itemVariants}
          className="bg-white p-3 rounded-lg shadow-sm"
        >
          <p className="text-sm font-medium text-gray-600">Bank</p>
          <p className="text-base font-semibold text-gray-800">UBA</p>
        </motion.div>
      </div>
      <p className="text-gray-600 mb-6">
        Once your payment is confirmed, your account will be verified in no
        time. Start exploring properties today!
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors duration-300 shadow-md"
          aria-label="Go to Osicon Homes homepage"
        >
         Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default SuccessMessage;
