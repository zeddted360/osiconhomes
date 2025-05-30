"use client";
import { handleCredentialsSignIn } from "@/app/action/handleCredentialsSignIn";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

interface LoginProps {
  searchParams: {
    callbackUrl?: string;
    error?: string;
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full p-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200 disabled:bg-indigo-400"
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
          Signing in...
        </div>
      ) : (
        "Sign In"
      )}
    </button>
  );
}

export default function Login({ searchParams }: LoginProps) {
  const router = useRouter();
  const [error, setError] = useState(searchParams?.error || "");

  async function handleSubmit(formData: FormData) {
    setError("");
    try {
      await handleCredentialsSignIn(formData);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500">Sign in to your account</p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="emailOrUsername"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Username
            </label>
            <input
              id="emailOrUsername"
              name="emailOrUsername"
              type="text"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              placeholder="Enter email or username"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              placeholder="••••••••"
            />
          </div>

          <SubmitButton />
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
