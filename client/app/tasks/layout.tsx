import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { useUserState } from "@/zustand/user";
import { redirect } from "next/navigation";
import { MobileMenu } from "@/components/mobileMenu";

export const metadata: Metadata = {
  title: "GetSetup",
  description: "task management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-rows-10 w-full sm:grid-cols-3 sm:grid-rows-1">
      <Sidebar />
      <MobileMenu />
      {children}
    </div>
  );
}
