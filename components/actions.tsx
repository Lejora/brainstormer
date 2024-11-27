"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link2Icon, PencilIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hook/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export function Actions({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) {
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(
        `${window.location.origin}/canvas/${id}
      `
      )
      .then(() => toast.success("リンクをコピーしました!"))
      .catch(() => toast.error("リンクをコピーできませんでした"));
  };

  const { mutate, pending } = useApiMutation(api.canvas.remove);
  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("キャンバスを消去しました"))
      .catch(() => toast.error("キャンバスの消去に失敗しました"));
  };

  const { onOpen } = useRenameModal()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2Icon />
          キャンバスのリンクをコピー
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id, title)}>
          <PencilIcon />
          名前を変更
        </DropdownMenuItem>
        <ConfirmModal
          onConfirm={onDelete}
          title={"本当にキャンバスを消去しますか?"}
          description={"キャンバスは一度消去した場合、復元できません。"}
          disabled={pending}
        >
          <Button
            className="hover:bg-white text-red-600 font-bold hover:text-red-500"
            variant="ghost"
          >
            <Trash2Icon />
            キャンバスを消去
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
