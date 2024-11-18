import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface HintProps {
  label: string;
  children: ReactNode;
  side?: "top" | "right" | "left" | "bottom";
  sideOffset?: number;
}

export function Hint({
  label,
  children,
  side = "top",
  sideOffset = 5,
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
