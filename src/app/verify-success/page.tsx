import Link from "next/link";

export default function VerifySuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Email Successfully Verified!
        </h2>
        <p className="text-gray-500">
          Your email has been verified. You can now log in to your account.
        </p>
        <Link href="/">
          <button className="w-full p-3 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold hover:from-amber-500 hover:to-orange-600 transition duration-200">
            Go to Homepage
          </button>
        </Link>
        <p className="text-sm text-gray-500">
          Ready to log in?{" "}
          <Link
            href="/log-in"
            className="text-amber-600 hover:underline font-medium"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
