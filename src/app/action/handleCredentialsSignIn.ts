"use server";
import { AuthError } from "next-auth";
import { signIn } from "../../../auth";

export async function handleCredentialsSignIn(formData: FormData) {
  const { emailOrUsername, password } = Object.fromEntries(formData);

  if (!emailOrUsername || !password) {
    throw new Error("Please provide both email/username and password");
  }

  try {
    const result = await signIn("credentials", {
      emailOrUsername,
      password,
      redirect: false,
    });
    if (result?.error) {
      throw new Error(result.error); 
    };

  } catch (err) {
    console.error("Authentication error", err instanceof Error && err.message);
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          throw new Error("Invalid email/username or password");
        case "AccessDenied":
          throw new Error("Access denied. Please check your account status.");
        default:
          throw new Error(`Authentication failed`);
      }
    }

    throw new Error(
      `Unexpected error: ${
        err instanceof Error ? "Something went wrong" : "Unknown error"
      }`
    );
  }
}
