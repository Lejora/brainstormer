import { Actions } from "@/components/actions";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon } from "lucide-react";

interface CanvasCardFooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
  id: string;
}

export function CanvasCardFooter({
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
  id,
}: CanvasCardFooterProps) {
  return (
    <div className="relative bg-white px-3 py-1">
      <div className="flex items-center justify-between">
        <p className="text-[13px] truncate max-w-full">{title}</p>
        <Actions id={id} title={title} side="right">
          <Button
            className="bg-white hover:bg-gray-100 rounded-full w-5 h-8
          outline-none text-black"
          >
            <EllipsisVerticalIcon />
          </Button>
        </Actions>
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
