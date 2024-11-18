import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint"
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export function ToolButton({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled
}: ToolButtonProps) {
  return (
    <Hint label={label} side="left" sideOffset={5}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  )
}