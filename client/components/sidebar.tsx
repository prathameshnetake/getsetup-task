"use client";

import { Input } from "@/components/ui/input";
import { SidePanelItem, SidePanelItemProps } from "./sidePanelItem";
import { ChevronsRight, BookCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

export const Sidebar: React.FC<{}> = () => {
  const taskTypes: SidePanelItemProps[] = [
    {
      text: "Upcoming",
      Icon: <ChevronsRight />,
      count: 1,
    },
    {
      text: "Today",
      Icon: <BookCheck />,
      count: 2,
    },
  ];

  const lists: SidePanelItemProps[] = [
    {
      text: "Personal",
      Icon: <ChevronsRight />,
      count: 1,
    },
    {
      text: "Work",
      Icon: <BookCheck />,
      count: 2,
    },
  ];

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <nav className="m-4 p-8 bg-slate-50 w-[300px] rounded-lg h-full  flex-col hidden sm:block sticky top-0">
      <div>
        <p className="font-bold text-xl">Menu</p>
      </div>
      <div className="mt-2 bg-transparent">
        <Input type="text" placeholder="Search" className="text-xs w-full" />
      </div>
      <div className="mt-8">
        <div className="text-xs font-bold">TASK</div>
        {taskTypes.map((item) => (
          <SidePanelItem {...item} key={item.text} />
        ))}
      </div>
      <div className="mt-8">
        <div className="text-xs font-bold">LISTS</div>
        {lists.map((item) => (
          <SidePanelItem {...item} key={item.text} />
        ))}
      </div>
      <div>
        <Button
          className="bg-yellow-400 w-full mt-6 text-black font-bold hover:bg-yellow-500"
          onClick={logout}
        >
          Sign Out
        </Button>
      </div>
    </nav>
  );
};
