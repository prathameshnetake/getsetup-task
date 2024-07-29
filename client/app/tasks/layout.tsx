import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { useUserState } from "@/zustand/user";
import { redirect } from "next/navigation";

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
    <div className="flex w-full">
      <Sidebar />
      {children}
    </div>
  );
}
