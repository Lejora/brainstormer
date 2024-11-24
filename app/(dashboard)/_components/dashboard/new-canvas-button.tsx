"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hook/use-api-mutation";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

interface NewCanvasButtonProps {
  teamId: string;
  disabled: boolean;
}

export function NewCanvasButton({ teamId, disabled }: NewCanvasButtonProps) {
  const { mutate, pending } = useApiMutation(api.canvas.create);
  const onClick = () => {
    mutate({
      teamId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Canvas Created");
      })
      .catch(() => {
        toast.error("Failed to create new canvas");
      });
  };

  return (
    <div>
      <Button
        disabled={pending || disabled}
        variant="outline"
        className={cn(
          `w-full h-full text-white bg-blue-600 hover:bg-blue-800 hover:text-white
          flex flex-col items-center justify-center transition-all duration-300 focus:outline-none`,
          (pending || disabled) && "opacity-70"
        )}
        onClick={onClick}
      >
        <PlusIcon className="h-20 w-20 text-white stroke-1" />
        <p className="text-sm text-white font-normal">キャンバスを追加</p>
      </Button>
    </div>
  );
}
