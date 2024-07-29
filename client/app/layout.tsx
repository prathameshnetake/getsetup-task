"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import "../utils/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useUserState } from "@/zustand/user";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setAuthLoading, user, setUser } = useUserState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setAuthLoading(false);
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <Toaster richColors />
          {children}
        </div>
      </body>
    </html>
  );
}
