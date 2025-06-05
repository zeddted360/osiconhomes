"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession, signIn, signOut } from "next-auth/react";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  status: "authenticated" | "unauthenticated" | "loading";
  login: (formData: FormData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email!,
        username: session.user.username!,
      });
    } else if (status === "unauthenticated") {
      setUser(null);
    }
  }, [session, status]);

  const login = async (formData: FormData) => {
    try {
      const result = await signIn("credentials", {
        emailOrUsername: formData.get("emailOrUsername"),
        password: formData.get("password"),
        redirect: false, 
      });
console.log("Login result:", result);
      if (result?.error === "CredentialsSignin") {
        throw new Error("Invalid credentials. Please try again.");
      };

      if (result?.error === "Configuration") {
        throw new Error("Email not verified or account not found");
      };

    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
