import { EllipsisVerticalIcon } from "lucide-react";

interface CanvasCardFooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}

export function CanvasCardFooter({
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
}: CanvasCardFooterProps) {
  return (
    <div className="relative bg-white px-3 py-1">
      <div className="flex items-center justify-between">
        <p className="text-[13px] truncate max-w-full">{title}</p>
        <EllipsisVerticalIcon size={18} onClick={() => {}} />
      </div>
      <p
        className="opacity-0 group-hover:opacity-100 transition-opacity 
      text-[11px] text-muted-foreground truncate"
      >
        作成者: {authorLabel}
        <br />
        {createdAtLabel}
      </p>
    </div>
  );
}
