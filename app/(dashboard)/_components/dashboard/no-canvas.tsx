"use client";

import { useOrganization } from "@clerk/clerk-react";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useApiMutation } from "@/hook/use-api-mutation";
import { toast } from "sonner";

export function NoCanvas() {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.canvas.create);
  const onClick = () => {
    if (!organization) return;

    mutate({
      teamId: organization.id,
      title: "Untitled",
    })
      .then((id) => toast.success("Canvas created"))
      // TODO redirect to canvas/{id}
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/takingNotes.svg"
        alt="taking notes"
        width={300}
        height={300}
      />
      <h1 className="font-bold text-2xl">キャンバスが見つかりませんでした</h1>
      <h2 className="text-sm text-slate-600 mt-3">
        キャンバスを作成して始めましょう!
      </h2>
      <Button className="mt-7" onClick={onClick} disabled={pending}>
        <PlusIcon />
        キャンバスを作成する
      </Button>
    </div>
  );
}
