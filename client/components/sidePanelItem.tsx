export interface SidePanelItemProps {
  Icon?: React.ReactNode;
  text?: string;
  count?: number;
  onClick?: () => void;
}

export const SidePanelItem: React.FC<SidePanelItemProps> = ({
  text,
  Icon,
  count,
}) => {
  return (
    <div className="flex items-center justify-between my-2">
      <div className="flex">
        <div className="mr-2">{Icon}</div>
        <p className="text-sm ">{text}</p>
      </div>
      <div className="p-2 bg-slate-200 self-end m-0 text-xs rounded">
        {count}
      </div>
    </div>
  );
};
