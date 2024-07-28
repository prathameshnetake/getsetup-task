import { Input } from "@/components/ui/input";
import { SidePanelItem, SidePanelItemProps } from "./sidePanelItem";
import { ChevronsRight, BookCheck } from "lucide-react";

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

  return (
    <nav className="m-4 p-8 bg-slate-50 w-[300px] rounded-lg h-full flex flex-col">
      <div>
        <p className="font-bold text-xl">Menu</p>
      </div>
      <div className="mt-2 bg-transparent">
        <Input type="text" placeholder="Search" className="text-xs w-full" />
      </div>
      <div className="mt-8">
        <div className="text-xs font-bold">TASK</div>
        {taskTypes.map((item) => (
          <SidePanelItem {...item} />
        ))}
      </div>
      <div className="mt-8">
        <div className="text-xs font-bold">LISTS</div>
        {lists.map((item) => (
          <SidePanelItem {...item} />
        ))}
      </div>
    </nav>
  );
};
