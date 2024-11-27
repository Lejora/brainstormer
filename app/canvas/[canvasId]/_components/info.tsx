"use client"

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRenameModal } from "@/store/use-rename-modal";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface InfoProps {
  canvasId: string;
}

export function Info({
  canvasId
}: InfoProps) {
  const { onOpen } = useRenameModal()

  const data = useQuery(api.canvas.get, {
    id: canvasId as Id<"canvas">
  })

  if (!data) return <InfoSkeleton />

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md space-x-2">
      <Hint label="ダッシュボードに戻る" side="bottom" sideOffset={10}>
        <Link href="/">
          <Button variant="outline" className="outline-none border-none w-5">
            <ArrowLeftIcon />
          </Button>
        </Link>
      </Hint>
      <Separator orientation="vertical" className="h-7" />
      <Hint label="キャンバスの名前を変更" side="bottom" sideOffset={10}>
        <Button
          variant="board"
          className="text-base px-5"
          onClick={() => onOpen(data._id, data.title)}
        >{data.title}
        </Button>
      </Hint>
    </div>
  )
}

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]">
    </div>
  )
}