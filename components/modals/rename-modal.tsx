"use client";

import { FormEventHandler, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRenameModal } from "@/store/use-rename-modal";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hook/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export function RenameModal() {
  const { mutate, pending } = useApiMutation(api.canvas.rename);

  const {
    isOpen,
    initialValues,
    onClose
  } = useRenameModal()

  const [title, setTitle] = useState(initialValues.title)

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues])

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    mutate({
      id: initialValues.id,
      title: title
    })
      .then(() => {
        toast.success("キャンバスの名前が変更されました");
        onClose()
      })
      .catch(() => toast.error("キャンバスの名前を変更できませんでした"))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>キャンバスの名前を変更</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          新しい名前を入力
        </DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="キャンバスの名前"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">キャンセル</Button>
            </DialogClose>
            <Button disabled={pending} type="submit" className="bg-blue-600 hover:bg-blue-500">
              保存
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}